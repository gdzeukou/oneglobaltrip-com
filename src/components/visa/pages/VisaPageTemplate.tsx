
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Original page content */}
      {children}
      
      {/* Enhanced sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div id="visa-checklist" className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <DynamicVisaChecklist onStartApplication={handleStartApplication} />
              </div>
            </div>
            
            {/* Full Wizard (when enabled) */}
            {showFullWizard && (
              <div id="full-visa-wizard" className="mt-12 group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <VisaWizard />
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <EmbeddedVisaWizard 
                  onStartFullWizard={handleStartFullWizard}
                />
              </div>
            </div>
            
            {/* Additional helpful content */}
            <div className="space-y-4">
              {context.isSchengen && (
                <div className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h4 className="font-semibold text-blue-800 mb-2">🇪🇺 Schengen Benefits</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Visit 27 countries with one visa</li>
                      <li>• Stay up to 90 days in 180-day period</li>
                      <li>• Freedom of movement within area</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="group relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
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
    </div>
  );
};

export default VisaPageTemplate;
