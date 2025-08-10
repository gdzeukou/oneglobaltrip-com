import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User,
  Loader2,
  Zap
} from 'lucide-react';
import { useXAI, XAIMessage } from '@/hooks/useXAI';
import { useAuth } from '@/contexts/AuthContext';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { useUserAgent } from '@/hooks/useUserAgent';
import { getDisplayAgentName } from '@/utils/displayAgentName';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface XAIChatbotProps {
  onClose?: () => void;
  context?: 'travel' | 'visa' | 'general';
  initialMessage?: string;
  className?: string;
}

export const XAIChatbot = ({ 
  onClose, 
  context = 'travel', 
  initialMessage,
  className = "" 
}: XAIChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage: sendXAIMessage, loading, error } = useXAI();
  const { user } = useAuth();
  const { preferences } = useAIAgentPreferences();
  const { agent } = useUserAgent();
  const displayAgentName = getDisplayAgentName(agent?.name, preferences?.aiAgentName);

  const contextPrompts = {
    travel: `You are ${displayAgentName}, an expert travel assistant powered by xAI Grok. Help users with travel planning, destinations, bookings, and travel advice with real-time insights and enhanced intelligence.`,
    visa: `You are ${displayAgentName}, a visa application expert powered by xAI Grok. Provide intelligent guidance on visa requirements, application processes, and documentation with the latest policy updates.`,
    general: `You are ${displayAgentName}, a helpful assistant powered by xAI Grok. Assist users with various travel and visa related questions using enhanced AI capabilities.`
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } else if (messages.length === 0) {
      const defaultWelcome: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm ${displayAgentName}, your AI assistant powered by xAI Grok. I'm here to help you with ${context === 'travel' ? 'travel planning and bookings' : context === 'visa' ? 'visa applications and requirements' : 'your questions'} using enhanced intelligence and real-time insights.\n\nHow can I assist you today?`,
        timestamp: new Date()
      };
      setMessages([defaultWelcome]);
    }
  }, [initialMessage, context, messages.length]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const xaiMessages: XAIMessage[] = [
        { role: 'system', content: contextPrompts[context] },
        ...conversationHistory,
        { role: 'user', content: userMessage.content }
      ];

      const response = await sendXAIMessage(xaiMessages, {
        model: 'grok-beta',
        temperature: 0.7,
        max_tokens: 1000
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
        {line}
      </div>
    ));
  };

  if (!isOpen && onClose) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg ${className}`}
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`${onClose ? 'fixed bottom-6 right-6 w-96 h-[500px]' : 'w-full h-full'} shadow-xl ${className}`}>
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="h-5 w-5" />
              <Zap className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <span>{displayAgentName} - xAI Grok Assistant</span>
          </CardTitle>
          {onClose && (
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Enhanced with xAI
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {context.charAt(0).toUpperCase() + context.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={
                    message.role === 'user' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-purple-100 text-purple-600'
                  }>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <div className="relative">
                        <Bot className="h-4 w-4" />
                        <Zap className="h-2 w-2 absolute -top-0.5 -right-0.5 text-yellow-500" />
                      </div>
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className={`rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm leading-relaxed">
                    {formatMessage(message.content)}
                  </div>
                  <div className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    <div className="relative">
                      <Bot className="h-4 w-4" />
                      <Zap className="h-2 w-2 absolute -top-0.5 -right-0.5 text-yellow-500" />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600">xAI Grok is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t p-4 bg-gray-50">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${displayAgentName} anything...`}
              className="flex-1"
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};