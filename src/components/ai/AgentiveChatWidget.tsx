import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentiveChatWidgetProps {
  mode?: 'floating' | 'inline' | 'fullwidth';
  context?: 'visa' | 'packages' | 'concierge';
  preloadData?: Record<string, any>;
  className?: string;
  height?: string;
}

// Extend Window interface to include Agentive
declare global {
  interface Window {
    agentive: any;
    agentiveConfig: any;
  }
}

const AgentiveChatWidget = ({ 
  mode = 'floating', 
  context, 
  preloadData,
  className = '',
  height = '520px'
}: AgentiveChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Agentive widget is loaded
    const checkAgentiveLoaded = () => {
      if (typeof window !== 'undefined' && window.agentive) {
        console.log('Agentive widget loaded successfully');
        setIsLoaded(true);
        
        // Initialize with context if provided
        if (context || preloadData) {
          try {
            window.agentive.setContext({
              context: context,
              data: preloadData,
              page: window.location.pathname
            });
            console.log('Agentive context set:', { context, preloadData });
          } catch (error) {
            console.warn('Failed to set Agentive context:', error);
          }
        }
      } else {
        // Keep checking for Agentive to load
        setTimeout(checkAgentiveLoaded, 500);
      }
    };

    // Start checking after a short delay to allow script to load
    setTimeout(checkAgentiveLoaded, 1000);
  }, [context, preloadData]);

  const handleToggleChat = () => {
    if (!isLoaded || !window.agentive) {
      console.warn('Agentive widget not yet loaded');
      return;
    }
    
    try {
      setIsOpen(!isOpen);
      
      if (!isOpen) {
        // Open Agentive chat
        window.agentive.open({
          mode: mode,
          context: context,
          data: preloadData
        });
        console.log('Agentive chat opened');
      } else {
        // Close Agentive chat
        window.agentive.close();
        console.log('Agentive chat closed');
      }
    } catch (error) {
      console.error('Error toggling Agentive chat:', error);
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
            title="Chat with Camron - Your AI Travel Assistant"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </Button>
          
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full animate-pulse" title="Loading chat..."></div>
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
            Chat with Camron
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
            <div className="text-center">
              <Button
                onClick={handleToggleChat}
                disabled={!isLoaded}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {isLoaded ? 'Start Chat' : 'Loading...'}
              </Button>
              {!isLoaded && (
                <p className="text-sm text-gray-500 mt-2">Loading chat widget...</p>
              )}
            </div>
          ) : (
            <div 
              id={`agentive-${context || 'inline'}-container`} 
              className="min-h-[400px] flex items-center justify-center"
              style={{ height }}
            >
              <p className="text-gray-500">Chat interface will appear here</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'fullwidth') {
    return (
      <div className={`w-full ${className}`}>
        <div 
          id={`agentive-${context || 'fullwidth'}-container`} 
          className="border border-gray-200 rounded-lg bg-white flex items-center justify-center"
          style={{ height: height === '520px' ? '600px' : height }}
        >
          {isLoaded ? (
            <div className="text-center p-8">
              <MessageCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chat with Camron</h3>
              <p className="text-gray-600 mb-4">Your AI travel assistant is ready to help!</p>
              <Button
                onClick={handleToggleChat}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Start Conversation
              </Button>
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading chat interface...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default AgentiveChatWidget;
