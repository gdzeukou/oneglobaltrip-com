
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLogo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-3 group transition-all duration-200 ease-tech hover:scale-105"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-tech-blue-500 to-tech-cyan-500 rounded-button flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-3 group-hover:animate-pulse-glow">
        <span className="text-white font-bold text-sm">OG</span>
      </div>
      <span className="font-space-grotesk font-bold text-xl text-white group-hover:text-tech-cyan-300 transition-colors duration-200">
        One Global Trip
      </span>
    </Link>
  );
};

export default NavigationLogo;
