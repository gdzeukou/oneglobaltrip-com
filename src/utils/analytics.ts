// Google Analytics 4 tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-PH5QYHK7C0', {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};

export const trackUserLogin = (userId: string) => {
  trackEvent('login', {
    user_id: userId,
  });
};

export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', {
    form_type: formType,
  });
};

export const trackAIAgentInteraction = (action: string, agentName?: string) => {
  trackEvent('ai_agent_interaction', {
    action,
    agent_name: agentName,
  });
};

export const trackVisaSearch = (destination: string, nationality: string) => {
  trackEvent('visa_search', {
    destination,
    nationality,
  });
};

export const trackFlightSearch = (origin: string, destination: string) => {
  trackEvent('flight_search', {
    origin,
    destination,
  });
};