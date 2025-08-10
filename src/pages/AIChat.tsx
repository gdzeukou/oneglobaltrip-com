
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatHeader } from '@/components/ai/ChatHeader';
import { MessageBubble } from '@/components/ai/MessageBubble';
import { ChatInput } from '@/components/ai/ChatInput';
import VoiceInterface from '@/components/ai/VoiceInterface';
import { getDisplayAgentName } from '@/utils/displayAgentName';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const AIChat = () => {
  const { agent } = useUserAgent();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { preferences, getPersonalizedContext } = useAIAgentPreferences();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const displayAgentName = getDisplayAgentName(agent?.name, preferences?.aiAgentName);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Greeting helpers
  const DAY_MS = 24 * 60 * 60 * 1000;
  const capitalizeWords = (s?: string | null) => (s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : '');

  const generateDynamicGreeting = async (): Promise<string> => {
    const agentName = getDisplayAgentName(agent?.name, preferences.aiAgentName) || 'your AI Travel Agent';
    const context = getPersonalizedContext();
    const now = new Date();

    // Fetch recent activity signals
    let recentActivities: any[] = [];
    try {
      if (user) {
        const { data } = await supabase
          .from('user_activity')
          .select('action_type, action_data, page_visited, created_at, last_seen')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);
        recentActivities = data || [];
      }
    } catch (e) {
      console.warn('Failed to fetch activity signals:', e);
    }

    const lastCityFromEvent = recentActivities.find((a) => a?.action_type === 'city_view')?.action_data?.city as
      | string
      | undefined;

    const lastCityFromPath = (() => {
      const pv = recentActivities.find(
        (a) => typeof a?.page_visited === 'string' && /city|destinations/i.test(a.page_visited || '')
      )?.page_visited as string | undefined;
      if (!pv) return undefined;
      const match = pv.match(/\/(city|destinations)\/([^\/?#]+)/i);
      return match?.[2]?.replace(/-/g, ' ');
    })();

    const lastCity = lastCityFromEvent || lastCityFromPath;
    const lastVisa = recentActivities.find((a) => a?.action_type === 'visa_flow_start')?.action_data?.country as
      | string
      | undefined;

    const lastActivityTs = recentActivities[0]?.created_at ? new Date(recentActivities[0].created_at).getTime() : 0;
    const lastConvTs = conversations[0]?.updated_at ? new Date(conversations[0].updated_at).getTime() : 0;
    const mostRecentTs = Math.max(lastActivityTs, lastConvTs);
    const isRecent = mostRecentTs > 0 && now.getTime() - mostRecentTs < 30 * DAY_MS;

    const dream = context?.dreamDestinations?.[0];
    const travelStyle = context?.travelStyle;

    const hook = lastCity
      ? `Still thinking about ${capitalizeWords(lastCity)}?`
      : lastVisa
      ? `Want to finish your ${lastVisa} visa step?`
      : dream
      ? `Quick idea for ${dream}…`
      : 'Got 60 seconds? Let\u2019s lock something great.';

    const windowText = 'your preferred dates';

    if (isRecent) {
      if (lastVisa) {
        return `${hook} I can complete your checklist and book your appointment now. Prefer that or should I price flights first?`;
      }
      if (lastCity) {
        return `${hook} I can price flights + a hotel for ${windowText} or draft a 3-day plan—your pick.`;
      }
      return `${hook} I can price a bundle or set a fare alert. What sounds better?`;
    }

    const firstName = (user?.user_metadata as any)?.first_name as string | undefined;
    const intro = firstName ? `Welcome back, ${firstName}! ` : 'Welcome back! ';
    const styleLine = travelStyle ? `As a ${travelStyle} traveler, ` : '';
    return `${intro}${hook} ${styleLine}Want me to price it or refine a route first?`;
  };
  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (user && messages.length === 0 && !currentConversationId) {
      (async () => {
        const greeting = await generateDynamicGreeting();
        const message: Message = {
          id: 'welcome-' + Date.now(),
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        };
        setMessages([message]);
      })();
    }
  }, [user, messages.length, currentConversationId, preferences, conversations]);

  const loadConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations.",
        variant: "destructive"
      });
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: Message[] = (data || []).map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: new Date(msg.created_at)
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive"
      });
    }
  };

  const createNewConversation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: 'New Chat'
        })
        .select()
        .single();

      if (error) throw error;

      const newConversation = data;
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
      setMessages([]);
      
      // Add personalized greeting
      const greeting = await generateDynamicGreeting();
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation.",
        variant: "destructive"
      });
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }

      toast({
        title: "Success",
        description: "Conversation deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation.",
        variant: "destructive"
      });
    }
  };

  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    loadMessages(conversationId);
  };

  const sendMessage = async () => {
    console.log('🚀 AI Travel Agent: Starting sendMessage process');
    console.log('📝 User state:', user ? `User ID: ${user.id}` : 'No user');
    console.log('💬 Input message:', inputMessage.substring(0, 50) + '...');
    console.log('🗣️ Current conversation ID:', currentConversationId);

    if (!inputMessage.trim()) {
      console.log('❌ Empty message, aborting');
      return;
    }

    if (!user) {
      console.log('❌ No user found, aborting');
      toast({
        title: "Authentication Required",
        description: `Please log in to chat with ${displayAgentName}.`,
        variant: "destructive"
      });
      return;
    }

    let conversationId = currentConversationId;

    // Create new conversation if none selected
    if (!conversationId) {
      console.log('📝 Creating new conversation...');
      await createNewConversation();
      conversationId = currentConversationId;
      if (!conversationId) {
        console.log('❌ Failed to create conversation, aborting');
        return;
      }
      console.log('✅ Conversation created:', conversationId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInputMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const context = getPersonalizedContext();
      
      const { data, error } = await supabase.functions.invoke('ai-travel-agent', {
        body: {
          message: currentInputMessage,
          conversationId,
          userId: user.id,
          personalizedContext: context
        }
      });

      if (error) {
        console.error('🚨 AI Travel Agent function error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(error.message || 'Failed to get response from AI Travel Agent');
      }

      if (!data) {
        console.error('🚨 No data received from AI Travel Agent');
        throw new Error('No response data received from AI Travel Agent');
      }

      console.log('✅ AI Travel Agent responded successfully:', data.response?.substring(0, 100) + '...');
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I apologize, but I encountered a technical issue. Please try again or rephrase your question.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update conversation title if it's the first message
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation && conversation.title === 'New Chat') {
        const newTitle = inputMessage.substring(0, 30) + (inputMessage.length > 30 ? '...' : '');
        await supabase
          .from('chat_conversations')
          .update({ title: newTitle })
          .eq('id', conversationId);
        
        setConversations(prev => 
          prev.map(c => c.id === conversationId ? { ...c, title: newTitle } : c)
        );
      }
    } catch (error) {
      console.error('🚨 AI Travel Agent Error - Full details:', {
        error,
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      
      // Enhanced error handling with specific, actionable error messages
      let errorMessage = "I'm experiencing some technical difficulties right now. ";
      let specificGuidance = "";
      
      // Check if the error has a specific message from the backend
      if (error?.message) {
        if (error.message.includes('OpenAI API key')) {
          errorMessage = "🔑 **API Configuration Issue**: My OpenAI connection isn't properly configured.";
          specificGuidance = "\n\n**What you can do:**\n• Contact support to resolve this configuration issue\n• This is a technical problem that needs admin attention";
        } else if (error.message.includes('Amadeus')) {
          errorMessage = "✈️ **Flight Search Issue**: I'm having trouble connecting to the flight booking service.";
          specificGuidance = "\n\n**What you can do:**\n• Try your search again in a few minutes\n• Double-check your city names and dates\n• Contact support if this continues";
        } else if (error.message.includes('conversation')) {
          errorMessage = "💬 **Chat System Issue**: I'm having trouble saving our conversation.";
          specificGuidance = "\n\n**What you can do:**\n• Try refreshing the page\n• Your message was received, but might not be saved\n• Contact support if this persists";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "🌐 **Connection Issue**: There seems to be a network connectivity problem.";
          specificGuidance = "\n\n**What you can do:**\n• Check your internet connection\n• Try again in a moment\n• Refresh the page if needed";
        } else if (error.message.includes('timeout')) {
          errorMessage = "⏱️ **Response Timeout**: My response is taking longer than expected.";
          specificGuidance = "\n\n**What you can do:**\n• Try a simpler question first\n• Wait a moment and try again\n• Your request might be processing - please be patient";
        } else {
          // Use the specific error message if available
          errorMessage = `⚠️ **Issue Detected**: ${error.message}`;
          specificGuidance = "\n\n**What you can do:**\n• Try rephrasing your question\n• Check that all required information is provided\n• Contact support if this continues";
        }
      } else {
        // Generic fallback with actionable guidance
        errorMessage = "I encountered an unexpected issue while processing your request.";
        specificGuidance = "\n\n**What you can do:**\n• Try rephrasing your question\n• Start with a simpler request (like 'search flights from NYC to LA')\n• Refresh the page if needed\n• Contact support if problems persist";
      }
      
      const errorAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `${errorMessage}${specificGuidance}\n\n💡 **I'm here to help with:**\n• Flight searches and bookings\n• Travel planning and advice\n• Visa requirements and guidance\n• Step-by-step travel assistance\n\nOnce this issue is resolved, I'll be ready to help you plan your perfect trip! 🌟`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorAssistantMessage]);
      
      toast({
        title: "AI Travel Agent Connection Issue",
        description: "I'm having trouble processing your request. Please see my message for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Group messages by sender and add timestamps
  const processedMessages = messages.map((message, index) => {
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];
    
    const isGrouped = prevMessage && prevMessage.role === message.role;
    const showTimestamp = !prevMessage || 
      prevMessage.role !== message.role ||
      (message.timestamp.getTime() - prevMessage.timestamp.getTime()) > 300000; // 5 minutes

    return {
      ...message,
      isGrouped,
      showTimestamp
    };
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Navigation - Hidden on mobile for full screen chat */}
      {!isMobile && <Navigation />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat Header */}
        <ChatHeader
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={selectConversation}
          onCreateConversation={createNewConversation}
          onDeleteConversation={deleteConversation}
          isMobile={isMobile}
        />
        <div className="px-4 pt-2">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-sm">
              <span className="font-medium">You’re chatting with</span>
              <span className="text-primary font-semibold">{displayAgentName}</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !currentConversationId ? (
            <div className="flex items-center justify-center h-full p-6">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome to {displayAgentName}
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Your personal AI travel agent with real-time flight search and booking assistance
                </p>
                <Button onClick={createNewConversation} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Planning Your Trip
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {processedMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isGrouped={message.isGrouped}
                  showTimestamp={message.showTimestamp}
                />
              ))}
              
              {isLoading && (
                <div className="px-4 mb-4">
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center space-x-2 max-w-[85%] sm:max-w-[70%]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        {displayAgentName} is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={sendMessage}
          isLoading={isLoading}
          placeholder={`Message ${displayAgentName}...`}
        />
        <VoiceInterface onSpeakingChange={() => {}} />
      </div>
    </div>
  );
};

export default AIChat;
