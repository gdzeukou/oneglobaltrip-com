
import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

interface AgentiveInlineWidgetProps {
  containerId: string;
  context?: string;
  height?: string;
  className?: string;
}

const AgentiveInlineWidget = ({ 
  containerId, 
  context = 'visa', 
  height = '520px',
  className = ''
}: AgentiveInlineWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializationAttempted = useRef(false);

  useEffect(() => {
    const initializeWidget = () => {
      if (initializationAttempted.current) return;
      
      try {
        // Create inline widget container with proper data attributes
        const container = document.getElementById(containerId);
        if (container) {
          container.setAttribute('data-agentive-inline', 'true');
          container.setAttribute('data-agent-id', '9d18091f-c302-4cde-a2cf-fca4d3a0b0c1');
          container.setAttribute('data-primary-color', '#FF6B00');
          container.setAttribute('data-context', context);
          container.setAttribute('data-height', height);
          
          // If Agentive is already loaded, initialize directly
          if (window.agentive) {
            window.agentive.createInline({
              container: `#${containerId}`,
              agentId: '9d18091f-c302-4cde-a2cf-fca4d3a0b0c1',
              primaryColor: '#FF6B00',
              context: context,
              height: height
            });
            console.log(`Agentive inline widget initialized for: ${containerId}`);
          } else {
            // Wait for Agentive to load
            const checkAgentive = setInterval(() => {
              if (window.agentive) {
                clearInterval(checkAgentive);
                window.agentive.createInline({
                  container: `#${containerId}`,
                  agentId: '9d18091f-c302-4cde-a2cf-fca4d3a0b0c1',
                  primaryColor: '#FF6B00',
                  context: context,
                  height: height
                });
                console.log(`Agentive inline widget initialized for: ${containerId}`);
              }
            }, 100);
            
            // Timeout after 10 seconds
            setTimeout(() => {
              clearInterval(checkAgentive);
              console.error('Agentive failed to load within 10 seconds');
            }, 10000);
          }
          
          initializationAttempted.current = true;
        }
      } catch (error) {
        console.error('Error initializing Agentive inline widget:', error);
      }
    };

    // Initialize when component mounts
    const timer = setTimeout(initializeWidget, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [containerId, context, height]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2 text-orange-500" />
        <h3 className="font-semibold text-gray-900">Chat with Camron</h3>
      </div>
      <div 
        id={containerId}
        ref={containerRef}
        className="min-h-[400px] relative"
        style={{ height }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p>Loading chat...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend window object for TypeScript
declare global {
  interface Window {
    agentive?: {
      createInline: (config: any) => void;
      init: (config: any) => void;
    };
    agentiveConfig?: any;
  }
}

export default AgentiveInlineWidget;
