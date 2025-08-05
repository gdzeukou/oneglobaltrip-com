
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  isLoading,
  placeholder = "Message..."
}: ChatInputProps) => {
  const [rows, setRows] = useState(1);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
    
    // Auto-resize textarea
    const lineCount = value.split('\n').length;
    const newRows = Math.min(Math.max(lineCount, 1), 5);
    setRows(newRows);
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex items-end space-x-2 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Textarea
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="min-h-[44px] max-h-[120px] resize-none border-2 rounded-3xl px-4 py-3 pr-12 focus:border-primary transition-colors"
            disabled={isLoading}
            rows={rows}
          />
          <Button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            size="sm"
            className="absolute right-2 bottom-2 h-8 w-8 rounded-full p-0 bg-primary hover:bg-primary/90 disabled:bg-muted"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
