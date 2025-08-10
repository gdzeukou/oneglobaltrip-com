import React from 'react';
import { Button } from '@/components/ui/button';

interface CaptionsPanelProps {
  userText?: string;
  userFinal?: boolean;
  assistantText?: string;
  assistantFinal?: boolean;
  agentName?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  onSave?: () => void;
  saving?: boolean;
}

const CaptionLine = ({
  label,
  text,
  isFinal,
}: {
  label: string;
  text?: string;
  isFinal?: boolean;
}) => {
  if (!text) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
        {label}
      </span>
      <p
        className={
          isFinal
            ? 'text-foreground font-medium'
            : 'text-muted-foreground/90 italic'
        }
      >
        {text}
      </p>
    </div>
  );
};

export const CaptionsPanel: React.FC<CaptionsPanelProps> = ({
  userText,
  userFinal,
  assistantText,
  assistantFinal,
  agentName = 'Assistant',
  onCopy,
  onDownload,
  onSave,
  saving,
}) => {
  const hasAny = Boolean(userText || assistantText);
  if (!hasAny) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,56rem)] pointer-events-auto">
      <div className="rounded-2xl border border-border bg-background/80 backdrop-blur shadow-lg p-3 sm:p-4 space-y-2">
        <CaptionLine label="You" text={userText} isFinal={userFinal} />
        <CaptionLine label={agentName} text={assistantText} isFinal={assistantFinal} />
        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={onCopy}>Copy Transcript</Button>
          <Button variant="outline" size="sm" onClick={onDownload}>Download .txt</Button>
          <Button size="sm" onClick={onSave} disabled={saving}>{saving ? 'Saving…' : 'Save to trip file'}</Button>
        </div>
      </div>
    </div>
  );
};

export default CaptionsPanel;
