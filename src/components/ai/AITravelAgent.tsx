
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AITravelAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: "Hi there! 👋 I'm your personal AI Travel Agent with real-time flight search capabilities!\n\nI can help you find and compare actual flights, discover the best routes, check real prices, and guide you through your entire travel journey - from visa assistance to booking confirmations.\n\nI work step by step to understand exactly what you need. To get started, could you tell me: are you planning a new trip? ✈️",
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    console.log('🚀 AI Travel Agent: Starting message send process');
    console.log('📝 Message:', inputMessage);
    console.log('👤 User ID:', user.id);
    console.log('💬 Conversation ID:', conversationId);
    
    // Test direct function URL accessibility first
    const functionUrl = `https://sdeyqojklszwarfrputz.supabase.co/functions/v1/ai-travel-agent`;
    console.log('🌐 Testing function accessibility at:', functionUrl);
    
    try {
      const testResponse = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZXlxb2prbHN6d2FyZnJwdXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODMyOTQsImV4cCI6MjA2NjA1OTI5NH0.YYRvAUAJF0Ow95sZ1OM21fDXz8FHtpUAMrmqlsbZf8o`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'test',
          conversationId: null,
          userId: user.id
        })
      });
      console.log('🧪 Direct function test response:', testResponse.status, testResponse.statusText);
      
      // If the test response was successful, log the body as well
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log('🧪 Direct function test data:', testData);
      } else {
        const testError = await testResponse.text();
        console.log('🧪 Direct function test error:', testError);
      }
    } catch (testError) {
      console.error('🚨 Direct function test failed:', testError);
    }

    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`📡 AI Travel Agent: Attempt ${retryCount + 1}/${maxRetries} - Calling edge function via Supabase client`);
        
        const { data, error } = await supabase.functions.invoke('ai-travel-agent', {
          body: {
            message: inputMessage,
            conversationId,
            userId: user.id
          }
        });

        console.log('📨 AI Travel Agent: Edge function response received');
        console.log('✅ Data:', data);
        console.log('❌ Error:', error);
        console.log('🔍 Full response details:', { data, error });

        if (error) {
          console.error('🚨 AI Travel Agent: Edge function error:', error);
          throw error;
        }

        if (!data || !data.response) {
          console.error('🚨 AI Travel Agent: Invalid response format:', data);
          throw new Error('Invalid response format from AI service');
        }

        console.log('✅ AI Travel Agent: Processing successful response');
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversationId);
        console.log('✅ AI Travel Agent: Message successfully processed and stored');
        return; // Success, exit retry loop

      } catch (error) {
        retryCount++;
        console.error(`❌ AI Travel Agent: Attempt ${retryCount}/${maxRetries} failed:`, error);
        
        if (retryCount >= maxRetries) {
          // Final attempt failed - show fallback response
          console.error('🚨 AI Travel Agent: All retry attempts failed, showing fallback response');
          
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `🤖 **AI Travel Agent Service Temporarily Unavailable**

I'm experiencing technical difficulties right now, but I'm here to help! Here's what might be happening:

**Possible Issues:**
• My AI processing service might be temporarily down
• There could be a connectivity issue
• API services might be experiencing high demand

**What you can try:**
• Wait a moment and try your message again
• Refresh the page and start a new conversation
• Check your internet connection

**Error Details for Support:**
• Error: ${error instanceof Error ? error.message : 'Unknown error'}
• Time: ${new Date().toISOString()}
• Retry attempts: ${maxRetries}

**I'm still here to help once services are restored!** 💪

Contact support if this issue persists for more than 5 minutes.`,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, fallbackMessage]);
          
          toast({
            title: "AI Travel Agent Temporarily Unavailable",
            description: "I've provided a detailed status update in the chat. Please try again in a moment.",
            variant: "destructive"
          });
        } else {
          // Wait before retry with exponential backoff
          const delay = 1000 * Math.pow(2, retryCount - 1);
          console.log(`⏳ AI Travel Agent: Waiting ${delay}ms before retry`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple formatting for better readability
    return content
      .split('\n')
      .map((line, index) => (
        <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
          {line}
        </div>
      ));
  };

  return (
    <>
      {/* Floating Chat Toggle Button - Mobile Optimized */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
      </Button>

      {/* Chat Widget - Mobile Optimized */}
      {isOpen && (
        <Card className="fixed inset-x-2 bottom-20 top-20 sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto z-40 sm:w-96 sm:h-[500px] shadow-2xl border-2 border-blue-200 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg flex-shrink-0">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base truncate">AI Travel Agent</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="sm:hidden text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            {/* Messages Area - Mobile Optimized */}
            <div className="flex-1 overflow-y-auto px-3 py-4 sm:p-4 space-y-3 sm:space-y-4 overscroll-contain">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[90%] sm:max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 mt-1">
                      <AvatarFallback className={
                        message.role === 'user' 
                          ? 'bg-blue-100 text-blue-600 text-xs sm:text-sm' 
                          : 'bg-purple-100 text-purple-600 text-xs sm:text-sm'
                      }>
                        {message.role === 'user' ? 'U' : 'M'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg px-3 py-2 text-sm sm:text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`} style={{ wordBreak: 'break-word' }}>
                      {formatMessage(message.content)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs sm:text-sm">
                        M
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Mobile Optimized */}
            <div className="border-t p-3 sm:p-4 flex-shrink-0 bg-white">
              <div className="flex space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about travel plans..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm resize-none min-h-[40px] max-h-24 leading-normal"
                  disabled={isLoading}
                  rows={1}
                  style={{ 
                    fontSize: '16px', // Prevents zoom on iOS
                    transform: 'translateZ(0)' // Hardware acceleration for smooth scrolling
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 h-10 w-10 sm:h-9 sm:w-auto sm:px-3 flex-shrink-0 touch-manipulation"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AITravelAgent;
