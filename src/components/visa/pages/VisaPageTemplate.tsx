
import React from 'react';
import { useVisaPageContext } from './hooks/useVisaPageContext';
import DynamicVisaChecklist from './DynamicVisaChecklist';
import EmbeddedVisaWizard from './EmbeddedVisaWizard';
import VisaWizard from '../wizard/VisaWizard';

interface VisaPageTemplateProps {
  children: React.ReactNode;
  showFullWizard?: boolean;
}

const VisaPageTemplate = ({ children, showFullWizard = false }: VisaPageTemplateProps) => {
  const context = useVisaPageContext();

  const handleStartFullWizard = () => {
    // Scroll to or show the full wizard
    const wizardElement = document.getElementById('full-visa-wizard');
    if (wizardElement) {
      wizardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartApplication = () => {
    // Navigate to unified travel form or specific application
    window.open('/get-started', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Original page content */}
      {children}
      
      {/* Enhanced sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div id="visa-checklist">
              <DynamicVisaChecklist onStartApplication={handleStartApplication} />
            </div>
            
            {/* Full Wizard (when enabled) */}
            {showFullWizard && (
              <div id="full-visa-wizard" className="mt-12">
                <VisaWizard />
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <EmbeddedVisaWizard 
              onStartFullWizard={handleStartFullWizard}
            />
            
            {/* Additional helpful content */}
            <div className="mt-6 space-y-4">
              {context.isSchengen && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🇪🇺 Schengen Benefits</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Visit 27 countries with one visa</li>
                    <li>• Stay up to 90 days in 180-day period</li>
                    <li>• Freedom of movement within area</li>
                  </ul>
                </div>
              )}
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Why Choose Us</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Expert document review</li>
                  <li>• 99% approval rate</li>
                  <li>• Fast processing</li>
                  <li>• 24/7 support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaPageTemplate;
