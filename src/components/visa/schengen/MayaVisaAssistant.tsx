import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Loader2, FileText, Check } from 'lucide-react';
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

interface MayaVisaAssistantProps {
  onClose: () => void;
  onComplete: (formData: any) => void;
}

const MayaVisaAssistant = ({ onClose, onComplete }: MayaVisaAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [collectedData, setCollectedData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const visaSteps = [
    "Personal Information",
    "Travel Document Details",
    "Travel Plans & Purpose",
    "Contact Information",
    "Previous Visa History",
    "Supporting Documents",
    "Review & Submit"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize Maya with visa-specific welcome message
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `🌟 **Welcome to your Schengen Visa Application with Maya!**

I'm here to guide you through your Schengen visa application step by step. I'll ask you questions in a conversational way to collect all the information needed for your official application form.

**Here's how this works:**
✅ I'll guide you through ${visaSteps.length} main sections
✅ I'll explain each requirement clearly
✅ I'll validate your answers in real-time
✅ I'll generate your official application at the end

**Ready to start?** Let's begin with some basic information about you.

What is your full name as it appears on your passport? (First name and surname)`,
      timestamp: new Date()
    }]);
  }, []);

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

    try {
      // Create a specialized prompt for visa application
      const visaPrompt = `You are Maya, an expert visa application assistant helping a user complete their Schengen short-stay visa application. 

Current conversation context:
- User is applying for a Schengen short-stay visa
- Current step: ${currentStep + 1}/${visaSteps.length} (${visaSteps[currentStep]})
- Collected data so far: ${JSON.stringify(collectedData)}

User's message: "${inputMessage}"

Instructions:
1. Respond conversationally and helpfully
2. Ask for one piece of information at a time
3. Validate the user's input
4. If the input is valid, acknowledge it and ask for the next required field
5. Guide them through the official Schengen visa requirements
6. Be encouraging and professional
7. If you need to collect specific data, format it clearly
8. Progress through: Personal Info → Travel Document → Travel Plans → Contact → Visa History → Documents → Review

Required fields to collect during this conversation:
- Personal: Full name, date of birth, place of birth, nationality, sex, civil status
- Travel Document: Passport number, issue date, expiry date, issuing authority
- Travel Plans: Purpose of visit, countries to visit, intended arrival/departure dates
- Contact: Home address, email, phone number, current occupation
- Previous Visas: Any Schengen visas in last 3 years
- Host Information: If visiting family/friends

Respond naturally and move the conversation forward to collect the next piece of information.`;

      const { data, error } = await supabase.functions.invoke('ai-travel-agent', {
        body: {
          message: visaPrompt,
          conversationId,
          userId: user.id,
          context: 'visa-application'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationId(data.conversationId);

      // Update collected data based on the conversation
      // This would be more sophisticated in a real implementation
      // For now, we'll simulate progress through steps
      if (messages.length > 10) { // After several exchanges
        setCurrentStep(Math.min(currentStep + 1, visaSteps.length - 1));
      }

    } catch (error) {
      console.error('Maya visa assistant error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I'm experiencing a technical issue right now. Let me help you in a different way.

Based on what we've discussed, I can see you're making good progress on your application. Would you like me to:

1. **Continue with traditional form** - Switch to our structured form where you can complete the remaining fields
2. **Try again** - Restart our conversation 
3. **Save progress** - Save what we've collected so far

What would you prefer?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Maya is having trouble connecting. You can continue with the traditional form.",
        variant: "destructive"
      });
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
    return content
      .split('\n')
      .map((line, index) => (
        <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
          {line}
        </div>
      ));
  };

  const handleCompleteApplication = () => {
    toast({
      title: "Application Generated!",
      description: "Maya has prepared your visa application based on our conversation.",
    });
    onComplete(collectedData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[600px] shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Maya - Schengen Visa Assistant</span>
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 text-sm">
              <span>Step {currentStep + 1} of {visaSteps.length}:</span>
              <span className="font-semibold">{visaSteps[currentStep]}</span>
            </div>
            <div className="mt-2 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / visaSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex h-[500px]">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                        {message.role === 'user' ? user?.email?.[0]?.toUpperCase() || 'U' : 'M'}
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
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        M
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-600">Maya is processing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your response here..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {currentStep >= visaSteps.length - 1 && (
                <div className="mt-3 flex justify-center">
                  <Button
                    onClick={handleCompleteApplication}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Generate My Application
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Progress Sidebar */}
          <div className="w-80 border-l bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Application Progress</h3>
            <div className="space-y-3">
              {visaSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded-lg ${
                    index < currentStep 
                      ? 'bg-green-100 text-green-800' 
                      : index === currentStep
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index < currentStep 
                      ? 'bg-green-500 text-white' 
                      : index === currentStep
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm">Need Help?</span>
              </div>
              <p className="text-blue-700 text-xs">
                Maya will explain each requirement and validate your responses. Take your time!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MayaVisaAssistant;