import { useState, useEffect, useRef } from 'react';
import { Send, Plus, MessageSquare, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PersonalizedAITravelAgent from '@/components/ai/PersonalizedAITravelAgent';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { useUserAgent } from '@/hooks/useUserAgent';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { preferences, getPersonalizedContext } = useAIAgentPreferences();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (user && messages.length === 0 && !currentConversationId) {
      const context = getPersonalizedContext();
      let welcomeMessage = '';

      if (context && preferences.aiAgentSetupCompleted) {
        welcomeMessage = `🎉 **Welcome back!** I'm ${context.agentName}, your personal AI Travel Agent!\n\n`;
        
        if (context.travelStyle) {
          welcomeMessage += `I remember you're a ${context.travelStyle} traveler`;
          if (context.dreamDestinations.length > 0) {
            welcomeMessage += ` with dreams of visiting ${context.dreamDestinations.slice(0, 2).join(' and ')}${context.dreamDestinations.length > 2 ? ' (and more!)' : ''}`;
          }
          welcomeMessage += '. ';
        }
        
        welcomeMessage += `\n\n✈️ **What I can help you with:**\n• Search real-time flights with live pricing\n• Find the best routes and deals matching your ${context.travelStyle || ''} style\n• Help with visa requirements and applications\n• Provide personalized travel recommendations\n• Guide you through complete booking process\n• Answer any travel-related questions\n\n`;
        
        if (context.dietaryPreferences.length > 0) {
          welcomeMessage += `💡 I'll also keep in mind your dietary preferences (${context.dietaryPreferences.join(', ')}) when making recommendations.\n\n`;
        }
        
        welcomeMessage += `🌟 **Ready to plan your next adventure?** Just tell me where you'd like to go!`;
      } else {
        welcomeMessage = `🎉 **Welcome to ${preferences.aiAgentName}!** I'm your personal AI Travel Agent, and I'm excited to help you plan your next adventure!\n\n✈️ **What I can do for you:**\n• Search real-time flights with live pricing\n• Find the best routes and deals\n• Help with visa requirements and applications\n• Provide personalized travel recommendations\n• Guide you through complete booking process\n• Answer any travel-related questions\n\n🌟 **Getting Started:**\nJust tell me where you'd like to go and when, and I'll take care of the rest! For example:\n• "I want to fly from New York to Paris in December"\n• "Help me find flights to Tokyo for my honeymoon"\n• "What visa do I need for Germany?"\n\nWhat travel plans can I help you with today? 🗺️`;
      }

      const message: Message = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      };
      setMessages([message]);
    }
  }, [user, messages.length, currentConversationId, preferences, getPersonalizedContext]);

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
      
      // Add welcome message
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hi there! 👋 I'm ${preferences.aiAgentName}, your personal AI Travel Agent with real-time flight search capabilities!\n\nI can search actual flights, compare live prices, find the best routes, and help with visas, bookings, and complete travel planning. I work step-by-step to understand your needs perfectly.\n\nWhat brings you here today? Are you planning a new adventure? ✈️`,
        timestamp: new Date()
      }]);
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
    console.log('🔧 AI Travel Agent Test: Complete user object:', user);
    console.log('🔧 AI Travel Agent Test: Auth session:', session);

    if (!inputMessage.trim()) {
      console.log('❌ Empty message, aborting');
      return;
    }

    if (!user) {
      console.log('❌ No user found, aborting');
      toast({
        title: "Authentication Required",
        description: `Please log in to chat with ${agent?.name || 'AI Travel Agent'}.`,
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

    console.log('📡 Calling AI Travel Agent Edge Function...');
    console.log('🔧 Function parameters:', {
      message: currentInputMessage.substring(0, 50) + '...',
      conversationId,
      userId: user.id,
      fullUrl: 'https://sdeyqojklszwarfrputz.supabase.co/functions/v1/ai-travel-agent'
    });
    console.log('🔧 AI Travel Agent Test: About to call supabase.functions.invoke...');

    try {
      const startTime = Date.now();
      
        const context = getPersonalizedContext();
        
        const { data, error } = await supabase.functions.invoke('ai-travel-agent', {
          body: {
            message: currentInputMessage,
            conversationId,
            userId: user.id,
            personalizedContext: context
          }
        });

      const endTime = Date.now();
      console.log(`⏱️ Function call completed in ${endTime - startTime}ms`);
      console.log('📨 AI Travel Agent response data:', data);
      console.log('❌ AI Travel Agent response error:', error);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => (
        <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
          {line}
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-80 bg-card border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <Button
                onClick={createNewConversation}
                className="w-full justify-start space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4" />
                <span>New Chat with {agent?.name || 'AI Travel Agent'}</span>
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 m-2 rounded-lg cursor-pointer group hover:bg-muted/50 transition-colors ${
                    currentConversationId === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => selectConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {conversation.title}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    {agent?.avatar_url ? (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={agent.avatar_url} alt={agent.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                          {agent.name?.[0] || 'A'}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Sparkles className="h-6 w-6 text-gradient-to-r from-blue-500 to-purple-600" />
                    )}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">{agent?.name || 'AI Travel Agent'} - Your AI Travel Agent</h1>
                    <p className="text-xs text-muted-foreground">Free for all members • Real-time flight search and more+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && !currentConversationId ? (
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Travel Agent is Ready to Help!
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Your personal AI travel agent with real-time flight search and booking assistance
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">✈️ Real-time Flights</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">🔒 Secure Booking</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">🆓 Completely Free</span>
                </div>
                <Button onClick={createNewConversation} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Planning Your Trip
                </Button>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      {message.role === 'user' ? (
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          U
                        </AvatarFallback>
                      ) : (
                        <>
                          {agent?.avatar_url ? (
                            <AvatarImage src={agent.avatar_url} alt={agent.name} />
                          ) : null}
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {agent?.name?.[0] || 'M'}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {formatMessage(message.content)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    {agent?.avatar_url ? (
                      <AvatarImage src={agent.avatar_url} alt={agent.name} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {agent?.name?.[0] || 'M'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">{agent?.name || 'AI Travel Agent'} is searching flights and planning your trip...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex space-x-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Tell ${agent?.name || 'your AI Travel Agent'} about your travel plans... (e.g., 'Find flights from NYC to London in March')`}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              {agent?.name || 'AI Travel Agent'} can search real flights, help with bookings, and provide travel assistance - all free for members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
