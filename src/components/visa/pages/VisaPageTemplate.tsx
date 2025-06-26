
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
            <div id="visa-checklist" className="group relative overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-indigo-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <DynamicVisaChecklist onStartApplication={handleStartApplication} />
              </div>
            </div>
            
            {/* Full Wizard (when enabled) */}
            {showFullWizard && (
              <div id="full-visa-wizard" className="mt-12 group relative overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  <VisaWizard />
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group relative overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-emerald-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <EmbeddedVisaWizard 
                  onStartFullWizard={handleStartFullWizard}
                />
              </div>
            </div>
            
            {/* Additional helpful content */}
            <div className="space-y-4">
              {context.isSchengen && (
                <div className="group relative overflow-hidden bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm border border-blue-200/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">
                    <h4 className="font-semibold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors duration-300">🇪🇺 Schengen Benefits</h4>
                    <ul className="text-sm text-blue-700 space-y-1 group-hover:text-blue-800 transition-colors duration-300">
                      <li>• Visit 27 countries with one visa</li>
                      <li>• Stay up to 90 days in 180-day period</li>
                      <li>• Freedom of movement within area</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="group relative overflow-hidden bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-sm border border-green-200/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <h4 className="font-semibold text-green-800 mb-2 group-hover:text-green-900 transition-colors duration-300">✅ Why Choose Us</h4>
                  <ul className="text-sm text-green-700 space-y-1 group-hover:text-green-800 transition-colors duration-300">
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
