
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
        content: "Hi there! 👋 I'm Maya, your personal AI Travel Agent with real-time flight search capabilities!\n\nI can help you find and compare actual flights, discover the best routes, check real prices, and guide you through your entire travel journey - from visa assistance to booking confirmations.\n\nI work step by step to understand exactly what you need. To get started, could you tell me: are you planning a new trip? ✈️",
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

    console.log('🚀 Maya: Starting message send process');
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
        console.log(`📡 Maya: Attempt ${retryCount + 1}/${maxRetries} - Calling edge function via Supabase client`);
        
        const { data, error } = await supabase.functions.invoke('ai-travel-agent', {
          body: {
            message: inputMessage,
            conversationId,
            userId: user.id
          }
        });

        console.log('📨 Maya: Edge function response received');
        console.log('✅ Data:', data);
        console.log('❌ Error:', error);
        console.log('🔍 Full response details:', { data, error });

        if (error) {
          console.error('🚨 Maya: Edge function error:', error);
          throw error;
        }

        if (!data || !data.response) {
          console.error('🚨 Maya: Invalid response format:', data);
          throw new Error('Invalid response format from AI service');
        }

        console.log('✅ Maya: Processing successful response');
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversationId);
        console.log('✅ Maya: Message successfully processed and stored');
        return; // Success, exit retry loop

      } catch (error) {
        retryCount++;
        console.error(`❌ Maya: Attempt ${retryCount}/${maxRetries} failed:`, error);
        
        if (retryCount >= maxRetries) {
          // Final attempt failed - show fallback response
          console.error('🚨 Maya: All retry attempts failed, showing fallback response');
          
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `🤖 **Maya AI Service Temporarily Unavailable**

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
            title: "Maya AI Temporarily Unavailable",
            description: "I've provided a detailed status update in the chat. Please try again in a moment.",
            variant: "destructive"
          });
        } else {
          // Wait before retry with exponential backoff
          const delay = 1000 * Math.pow(2, retryCount - 1);
          console.log(`⏳ Maya: Waiting ${delay}ms before retry`);
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
      {/* Floating Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] shadow-2xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Maya - AI Travel Agent</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[420px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={
                        message.role === 'user' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-purple-100 text-purple-600'
                      }>
                        {message.role === 'user' ? 'U' : 'M'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formatMessage(message.content)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        M
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-600">Maya is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell Maya about your travel plans..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
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
