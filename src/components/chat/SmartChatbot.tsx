
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  FileText, 
  Calendar,
  CreditCard,
  Phone
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  quickReplies?: string[];
  attachments?: string[];
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'bot',
    message: "Hi! I'm your visa assistant. I can help you with application status, requirements, or answer any questions you have.",
    timestamp: new Date(),
    quickReplies: ['Check my application', 'Visa requirements', 'Schedule consultation', 'Pricing info']
  }
];

const botResponses: Record<string, ChatMessage> = {
  'check my application': {
    id: 'bot-status',
    type: 'bot',
    message: "I can see your application VIS-2024-001234 is currently in the payment processing stage. Would you like to see the full timeline or make a payment?",
    timestamp: new Date(),
    quickReplies: ['View timeline', 'Make payment', 'Contact support']
  },
  'visa requirements': {
    id: 'bot-requirements',
    type: 'bot',
    message: "I'd be happy to help with visa requirements! Which country are you planning to visit? Our most popular destinations are Portugal, Germany, Canada, and the UK.",
    timestamp: new Date(),
    quickReplies: ['Portugal', 'Germany', 'Canada', 'United Kingdom']
  },
  'schedule consultation': {
    id: 'bot-consultation',
    type: 'bot',
    message: "Great! I can schedule a free consultation with one of our visa experts. We have slots available this week. What works best for you?",
    timestamp: new Date(),
    quickReplies: ['Tomorrow', 'This weekend', 'Next week', 'Call me now']
  },
  'pricing info': {
    id: 'bot-pricing',
    type: 'bot',
    message: "Our visa services start from $249 for tourist visas. Prices vary by destination and visa type. Would you like specific pricing for any country?",
    timestamp: new Date(),
    quickReplies: ['Tourist visa prices', 'Business visa prices', 'Long-stay visa prices', 'Get quote']
  }
};

export const SmartChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[message.toLowerCase()] || {
        id: `bot-${Date.now()}`,
        type: 'bot' as const,
        message: "I understand you're asking about " + message + ". Let me connect you with a specialist who can provide detailed information.",
        timestamp: new Date(),
        quickReplies: ['Talk to specialist', 'More info', 'Other questions']
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
    }
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
        
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3 }}
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[500px] z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visa Assistant</h3>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`flex items-start max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-blue-600 ml-2' : 'bg-gray-200 mr-2'
                      }`}>
                        {message.type === 'user' ? 
                          <User className="h-3 w-3 text-white" /> : 
                          <Bot className="h-3 w-3 text-gray-600" />
                        }
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        {message.quickReplies && (
                          <div className="mt-2 space-y-1">
                            {message.quickReplies.map((reply, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="block w-full text-left text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <Bot className="h-3 w-3 text-gray-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/20">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                
                {/* Quick Actions */}
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleQuickReply('Check my application')}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Status
                  </button>
                  <button
                    onClick={() => handleQuickReply('Schedule consultation')}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Book
                  </button>
                  <button
                    onClick={() => handleQuickReply('Pricing info')}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <CreditCard className="h-3 w-3 mr-1" />
                    Price
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChatbot;
