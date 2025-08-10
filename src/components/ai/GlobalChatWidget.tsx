import React, { useEffect, useState } from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { XAIChatbot } from '@/components/ai/XAIChatbot';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { getDisplayAgentName } from '@/utils/displayAgentName';

const GlobalChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { agent } = useUserAgent();
  const { preferences } = useAIAgentPreferences();
  const displayAgentName = getDisplayAgentName(agent?.name, preferences?.aiAgentName) || 'AI Travel Agent';

  // Hide widget on the dedicated chat page
  const isChatPage = location.pathname === '/ai-chat';

  useEffect(() => {
    // Minimize when navigating
    setOpen(false);
  }, [location.pathname]);

  if (isChatPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-[340px] h-[520px] rounded-xl border border-border bg-background shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Bot className="h-4 w-4 text-primary" />
              <span>{displayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(520px-44px)]">
            <XAIChatbot onClose={() => setOpen(false)} className="h-full" />
          </div>
        </div>
      )}

      <Button
        onClick={() => setOpen(!open)}
        size="lg"
        className="rounded-full shadow-lg"
        aria-label={open ? 'Hide AI chat' : 'Open AI chat'}
      >
        <Bot className="h-5 w-5 mr-2" />
        {open ? 'Hide Assistant' : `Chat with ${displayAgentName}`}
      </Button>
    </div>
  );
};

export default GlobalChatWidget;