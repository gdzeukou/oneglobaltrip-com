
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentiveChatWidgetProps {
  mode?: 'floating' | 'inline' | 'fullwidth';
  context?: string;
  preloadData?: Record<string, any>;
  className?: string;
}

const AgentiveChatWidget = ({ 
  mode = 'floating', 
  context, 
  preloadData,
  className = '' 
}: AgentiveChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Agentive widget is loaded
    const checkAgentiveLoaded = () => {
      if (window.agentive && window.agentiveConfig) {
        setIsLoaded(true);
        
        // Initialize with context if provided
        if (context || preloadData) {
          window.agentive.setContext({
            context: context,
            data: preloadData,
            page: window.location.pathname
          });
        }
      } else {
        setTimeout(checkAgentiveLoaded, 100);
      }
    };

    checkAgentiveLoaded();
  }, [context, preloadData]);

  const handleToggleChat = () => {
    if (!isLoaded) return;
    
    setIsOpen(!isOpen);
    
    if (!isOpen && window.agentive) {
      // Open Agentive chat
      window.agentive.open({
        mode: mode,
        context: context,
        data: preloadData
      });
    } else if (window.agentive) {
      // Close Agentive chat
      window.agentive.close();
    }
  };

  if (mode === 'floating') {
    return (
      <>
        {/* Floating Chat Button */}
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
          <Button
            onClick={handleToggleChat}
            disabled={!isLoaded}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="Chat with our AI Travel Assistant"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </Button>
          
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Chat overlay for mobile */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />
        )}
      </>
    );
  }

  if (mode === 'inline') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-orange-500" />
            AI Travel Assistant
          </h3>
          {isOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="p-4">
          {!isOpen ? (
            <Button
              onClick={handleToggleChat}
              disabled={!isLoaded}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Start Chat
            </Button>
          ) : (
            <div id="agentive-inline-container" className="min-h-[400px]">
              {/* Agentive widget will be injected here */}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'fullwidth') {
    return (
      <div className={`w-full ${className}`}>
        <div id="agentive-fullwidth-container" className="min-h-[600px] border border-gray-200 rounded-lg">
          {/* Agentive widget will be injected here */}
        </div>
      </div>
    );
  }

  return null;
};

// Add global types for Agentive
declare global {
  interface Window {
    agentive: {
      open: (config?: any) => void;
      close: () => void;
      setContext: (context: any) => void;
    };
    agentiveConfig: {
      agentId: string;
      apiKey: string;
      baseUrl: string;
      webhookUrl: string;
    };
  }
}

export default AgentiveChatWidget;
