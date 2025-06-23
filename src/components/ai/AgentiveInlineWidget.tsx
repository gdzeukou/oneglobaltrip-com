
import React, { useEffect } from 'react';
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
  useEffect(() => {
    // Create inline widget script for this specific container
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        function initInlineWidget() {
          if (typeof window.agentive !== 'undefined') {
            window.agentive.init({
              agentId: '9d18091f-c302-4cde-a2cf-fca4d3a0b0c1',
              mode: 'inline',
              container: '#${containerId}',
              primaryColor: '#FF6B00',
              context: '${context}',
              height: '${height}'
            });
            console.log('Agentive inline widget initialized for container: ${containerId}');
          } else {
            setTimeout(initInlineWidget, 500);
          }
        }
        initInlineWidget();
      })();
    `;
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
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
        className="min-h-[400px]"
        style={{ height }}
      >
        {/* Agentive will mount the chat interface here */}
      </div>
    </div>
  );
};

export default AgentiveInlineWidget;
