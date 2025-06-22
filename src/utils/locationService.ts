
// Location service utility for IP geolocation
export interface LocationData {
  city?: string;
  country?: string;
  region?: string;
  ip?: string;
}

export const getLocationFromIP = async (ip?: string): Promise<LocationData> => {
  try {
    // Using ipapi.co for IP geolocation (free tier available)
    const response = await fetch(`https://ipapi.co/${ip || ''}/json/`);
    const data = await response.json();
    
    return {
      city: data.city,
      country: data.country_name,
      region: data.region,
      ip: data.ip
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return {};
  }
};

export const trackUserActivity = async (
  email: string, 
  pageVisited: string, 
  actionType: string = 'page_visit',
  additionalData?: any
) => {
  try {
    // Get user's IP and location
    const locationData = await getLocationFromIP();
    
    // Track session duration (simplified - in production you'd use session storage)
    const sessionStart = sessionStorage.getItem('session_start');
    const now = Date.now();
    
    if (!sessionStart) {
      sessionStorage.setItem('session_start', now.toString());
    }
    
    const sessionDuration = sessionStart ? Math.floor((now - parseInt(sessionStart)) / 1000) : 0;
    
    // Get referrer
    const referrerSource = document.referrer || 'direct';
    
    const activityData = {
      email,
      page_visited: pageVisited,
      action_type: actionType,
      action_data: additionalData,
      session_duration: sessionDuration,
      referrer_source: referrerSource,
      location_data: locationData,
      user_agent: navigator.userAgent,
      ip_address: locationData.ip,
      is_online: true
    };

    // Send to Supabase (you would import supabase client here)
    console.log('Tracking activity:', activityData);
    
    // Note: In production, you'd actually save this to the database
    // const { error } = await supabase.from('user_activity').insert([activityData]);
    
  } catch (error) {
    console.error('Error tracking user activity:', error);
  }
};
