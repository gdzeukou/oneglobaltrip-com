
import React, { useState, useEffect } from 'react';
import { Star, Users, Globe, CheckCircle, Award, Shield } from 'lucide-react';

const EnhancedTrustIndicators = () => {
  const [animatedStats, setAnimatedStats] = useState({
    travelers: 0,
    countries: 0,
    successRate: 0,
    support: 0
  });

  const finalStats = {
    travelers: 25000,
    countries: 180,
    successRate: 98,
    support: 24
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedStats({
        travelers: Math.floor(finalStats.travelers * easeOut),
        countries: Math.floor(finalStats.countries * easeOut),
        successRate: Math.floor(finalStats.successRate * easeOut),
        support: Math.floor(finalStats.support * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      number: `${animatedStats.travelers.toLocaleString()}+`, 
      label: 'Happy Travelers',
      icon: Users,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500/10',
      description: 'Satisfied customers worldwide'
    },
    { 
      number: `${animatedStats.countries}+`, 
      label: 'Countries Served',
      icon: Globe,
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      description: 'Global visa processing network'
    },
    { 
      number: `${animatedStats.successRate}%`, 
      label: 'Visa Success Rate',
      icon: CheckCircle,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-500/10',
      description: 'Industry-leading approval rate'
    },
    { 
      number: `${animatedStats.support}/7`, 
      label: 'Support Available',
      icon: Shield,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/10',
      description: 'Round-the-clock assistance'
    },
  ];

  const certifications = [
    { name: 'IATA Certified', icon: Award },
    { name: 'ISO 27001', icon: Shield },
    { name: 'BBB A+', icon: Star },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-brand-900 font-playfair mb-2 group-hover:text-brand-800 transition-colors">
                {stat.number}
              </div>
              <div className="text-brand-800 font-semibold text-lg mb-1 font-inter">
                {stat.label}
              </div>
              <div className="text-brand-700 text-sm opacity-80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Banner */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-brand-900 font-playfair mb-2">
                Trusted & Certified
              </h3>
              <p className="text-brand-800 font-inter">
                Licensed and regulated by international travel authorities
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-white/30 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/40 transition-colors"
                >
                  <cert.icon className="h-5 w-5 text-brand-900" />
                  <span className="text-brand-900 font-medium text-sm font-inter">
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-brand-900 font-medium text-sm font-inter">
                Live: 47 visas approved in the last hour
              </span>
            </div>
            <div className="w-px h-4 bg-brand-800/30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-brand-900 font-medium text-sm font-inter">
                12 new bookings today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTrustIndicators;
