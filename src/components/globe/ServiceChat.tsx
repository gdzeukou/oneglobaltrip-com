import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, Send, Loader2, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { SelectedDestination } from './DestinationCard';
import type { GlobeUserProfile } from '@/hooks/useUserProfile';
import type { TripStop } from '@/hooks/useTrip';

export type ServiceType = 'flights' | 'hotels' | 'rentals' | 'activities' | 'visa' | 'immigration';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  flights: 'Flights',
  hotels: 'Hotels',
  rentals: 'Car Rentals',
  activities: 'Activities',
  visa: 'Visa & SOP',
  immigration: 'Immigration',
};

const SERVICE_OPENERS: Record<ServiceType, string> = {
  flights: '✈️ I\'ll help you find the best flights',
  hotels: '🏨 Let\'s find you the perfect place to stay',
  rentals: '🚗 I\'ll help you book a rental car',
  activities: '🎯 Let\'s discover the best experiences',
  visa: '📋 I\'ll guide you through the visa process',
  immigration: '🏛️ I\'ll explain your immigration options',
};

interface ServiceChatProps {
  service: ServiceType;
  destination: SelectedDestination;
  userProfile: GlobeUserProfile;
  tripStops: TripStop[];
  onClose: () => void;
}

const ServiceChat = ({ service, destination, userProfile, tripStops, onClose }: ServiceChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (userMessage: string, history: Message[]) => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('travel-assistant', {
        body: {
          service,
          destination: {
            name: destination.name,
            country: destination.country,
            countrySlug: destination.countrySlug,
            citySlug: destination.citySlug,
          },
          userProfile: {
            nationality: userProfile.nationality,
            passportCountries: userProfile.passport_countries,
            homeCity: userProfile.home_city,
          },
          tripStops: tripStops.map((s) => ({ name: s.name, country: s.country })),
          messages: [...history, { role: 'user', content: userMessage }],
        },
      });

      if (error) throw error;
      const reply = data?.reply ?? 'Sorry, I couldn\'t process that. Please try again.';
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again in a moment.' },
      ]);
    } finally {
      setSending(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [service, destination, userProfile, tripStops]);

  // Send initial greeting
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    const opener = SERVICE_OPENERS[service];
    const greeting = `${opener} to **${destination.name}, ${destination.country}**! ${
      userProfile.nationality
        ? `I see you have a ${userProfile.nationality} passport. `
        : 'To give you the best advice, could you share your nationality? '
    }What dates are you planning to travel?`;
    setMessages([{ role: 'assistant', content: greeting }]);
  }, [service, destination, userProfile.nationality, initialized]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    sendMessage(text, messages);
  };

  return (
    <div
      className="fixed inset-0 z-60 flex flex-col bg-black/95 backdrop-blur-2xl"
      style={{ animation: 'slideInRight 0.3s cubic-bezier(0.32, 0.72, 0, 1)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <Bot size={18} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{SERVICE_LABELS[service]} Assistant</p>
            <p className="text-white/40 text-xs">{destination.name}, {destination.country}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.role === 'assistant'
                  ? 'bg-blue-500/20 border border-blue-400/30'
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              {msg.role === 'assistant'
                ? <Bot size={14} className="text-blue-400" />
                : <User size={14} className="text-white/70" />
              }
            </div>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-white/8 border border-white/10 text-white/90 rounded-tl-sm'
                  : 'bg-blue-600/80 text-white rounded-tr-sm'
              }`}
            >
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>
                  {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                  {j < msg.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-blue-400" />
            </div>
            <div className="bg-white/8 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center h-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-white/10">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message…"
            className="flex-1 bg-white/8 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-2xl bg-blue-600 disabled:bg-white/10 flex items-center justify-center transition-all hover:bg-blue-500 disabled:cursor-not-allowed"
          >
            {sending
              ? <Loader2 size={16} className="text-white animate-spin" />
              : <Send size={16} className="text-white" />
            }
          </button>
        </div>
        <p className="text-white/20 text-[10px] text-center mt-2">
          Powered by AI · Not financial or legal advice
        </p>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ServiceChat;
