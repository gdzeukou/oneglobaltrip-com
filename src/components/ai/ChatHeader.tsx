
import { useState } from 'react';
import { MessageSquare, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { ConversationsModal } from './ConversationsModal';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatHeaderProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isMobile: boolean;
}

export const ChatHeader = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  isMobile
}: ChatHeaderProps) => {
  const [showConversations, setShowConversations] = useState(false);
  const { agent } = useUserAgent();
  const { preferences } = useAIAgentPreferences();
  const displayAgentName = agent?.name || preferences?.aiAgentName || 'AI Travel Agent';

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* Left - Recent Conversations */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowConversations(true)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-4 w-4" />
          {!isMobile && <span className="text-sm">Chats</span>}
        </Button>

        {/* Center - Current Chat Info */}
        <div className="flex items-center space-x-2 flex-1 justify-center">
          {agent?.avatar_url ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={agent.avatar_url} alt={agent.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {agent.name?.[0] || 'A'}
              </AvatarFallback>
            </Avatar>
          ) : null}
          <div className="text-center">
            <h1 className="text-sm font-medium truncate max-w-[200px]">
              {currentConversation?.title || displayAgentName}
            </h1>
            {!isMobile && (
              <p className="text-xs text-muted-foreground">Online</p>
            )}
          </div>
        </div>

        {/* Right - New Chat */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCreateConversation}
          className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          {!isMobile && <span className="text-sm">New</span>}
        </Button>
      </div>

      <ConversationsModal
        isOpen={showConversations}
        onClose={() => setShowConversations(false)}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={(id) => {
          onSelectConversation(id);
          setShowConversations(false);
        }}
        onDeleteConversation={onDeleteConversation}
      />
    </>
  );
};
