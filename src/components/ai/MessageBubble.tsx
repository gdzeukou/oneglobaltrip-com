
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isGrouped: boolean;
  showTimestamp: boolean;
}

export const MessageBubble = ({ message, isGrouped, showTimestamp }: MessageBubbleProps) => {
  const { agent } = useUserAgent();
  const { user } = useAuth();

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
        {line}
      </div>
    ));
  };

  const isUser = message.role === 'user';

  return (
    <div className="px-4">
      {showTimestamp && (
        <div className="flex justify-center mb-4">
          <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      )}

      <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        {!isUser && (
          <div className="mr-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={agent?.avatar_url || undefined} alt={agent?.name || 'Assistant'} />
              <AvatarFallback>{(agent?.name?.[0] || 'A').toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className={`max-w-[85%] sm:max-w-[70%] ${isUser ? 'order-1' : ''}`}>
          <div
            className={`px-4 py-2 rounded-2xl break-words ${
              isUser
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            } ${isGrouped ? (isUser ? 'rounded-tr-2xl' : 'rounded-tl-2xl') : ''}`}
          >
            <div className="text-sm leading-relaxed">{formatMessage(message.content)}</div>
          </div>
        </div>

        {isUser && (
          <div className="ml-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={undefined} alt={user?.email || 'You'} />
              <AvatarFallback>{(user?.email?.[0] || 'Y').toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
};
