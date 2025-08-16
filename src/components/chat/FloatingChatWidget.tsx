import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FloatingChatWidgetProps {
  className?: string;
}

const FloatingChatWidget = ({ className }: FloatingChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [userEmail, setUserEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [leadCaptureStep, setLeadCaptureStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: currentMessage,
          chatHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          userEmail,
          sessionId,
          leadCaptureStep
        }
      });

      if (error) {
        console.error('Chat error:', error);
        throw error;
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Handle lead capture prompts
      if (data.shouldCaptureEmail && !userEmail) {
        setShowEmailCapture(true);
      }

      if (data.nextLeadStep !== undefined) {
        setLeadCaptureStep(data.nextLeadStep);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = () => {
    if (userEmail.trim()) {
      setShowEmailCapture(false);
      setLeadCaptureStep(1);
      const emailMessage: Message = {
        role: 'assistant',
        content: `Thank you! I'll send personalized visa requirements to ${userEmail}. Now, tell me about your travel plans - where are you from and where would you like to go?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, emailMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showEmailCapture) {
        handleEmailSubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          💬 Need visa help? Ask me anything!
        </div>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card className="w-80 h-96 flex flex-col shadow-2xl border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <div>
              <h4 className="font-semibold">Visa Assistant</h4>
              <p className="text-xs opacity-90">Ask about visas & travel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Bot className="h-4 w-4" />
                <p className="text-sm">Hi! I'm here to help with your visa and travel questions. What would you like to know?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start space-x-2",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Bot className="h-4 w-4 mt-1 text-primary" />
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-primary" />
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Email Capture */}
          {showEmailCapture && (
            <div className="p-4 bg-blue-50 border-t">
              <p className="text-sm text-blue-800 mb-2">Get personalized visa requirements sent to your email:</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleEmailSubmit}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about visas, travel requirements..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="text-sm"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingChatWidget;