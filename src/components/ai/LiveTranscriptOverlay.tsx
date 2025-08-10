import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LiveTranscriptOverlayProps {
  userText: string;
  assistantText: string;
  agentName?: string;
  agentAvatarUrl?: string;
}

export const LiveTranscriptOverlay: React.FC<LiveTranscriptOverlayProps> = ({ userText, assistantText, agentName, agentAvatarUrl }) => {
  if (!userText && !assistantText) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-end sm:items-center justify-center p-4 sm:px-6">
      <div className="w-full max-w-3xl space-y-3">
        {assistantText && (
          <div className="pointer-events-none w-full text-center">
            <div className="inline-flex items-center gap-3 bg-background/80 backdrop-blur px-4 py-3 rounded-2xl shadow border border-border">
              <Avatar className="h-6 w-6">
                <AvatarImage src={agentAvatarUrl || undefined} alt={agentName || 'Assistant'} />
                <AvatarFallback>{(agentName?.[0] || 'A').toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="inline-flex items-baseline gap-2 text-left">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{agentName || 'Assistant'}</span>
                <p className="text-base sm:text-xl leading-relaxed text-foreground">{assistantText}</p>
              </div>
            </div>
          </div>
        )}
        {userText && (
          <div className="pointer-events-none w-full text-center">
            <div className="inline-flex items-center gap-3 bg-background/70 backdrop-blur px-4 py-3 rounded-2xl shadow border border-border">
              <Avatar className="h-6 w-6">
                <AvatarImage src={undefined} alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="inline-flex items-baseline gap-2 text-left">
                <span className="text-xs text-muted-foreground whitespace-nowrap">You</span>
                <p className="text-base sm:text-xl leading-relaxed text-foreground">{userText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTranscriptOverlay;
