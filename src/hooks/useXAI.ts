import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface XAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface XAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: XAIMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface XAIOptions {
  model?: 'grok-beta';
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

export const useXAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    messages: XAIMessage[],
    options: XAIOptions = {}
  ): Promise<XAIResponse> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('xai-chat', {
        body: {
          messages,
          model: options.model || 'grok-beta',
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens ?? 1000,
          top_p: options.top_p ?? 1,
          stream: options.stream ?? false,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to communicate with xAI');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const streamMessage = async (
    messages: XAIMessage[],
    options: XAIOptions = {},
    onChunk?: (chunk: string) => void
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sdeyqojklszwarfrputz.functions.supabase.co/functions/v1/xai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZXlxb2prbHN6d2FyZnJwdXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODMyOTQsImV4cCI6MjA2NjA1OTI5NH0.YYRvAUAJF0Ow95sZ1OM21fDXz8FHtpUAMrmqlsbZf8o`,
          },
          body: JSON.stringify({
            messages,
            model: options.model || 'grok-beta',
            temperature: options.temperature ?? 0.7,
            max_tokens: options.max_tokens ?? 1000,
            top_p: options.top_p ?? 1,
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content && onChunk) {
                onChunk(content);
              }
            } catch (e) {
              console.warn('Failed to parse SSE chunk:', e);
            }
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    streamMessage,
    loading,
    error,
  };
};