import React from 'react';

interface FlagIconProps {
  countryCode: string;
  className?: string;
}

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className = "w-6 h-4" }) => {
  const flagSvgs: Record<string, JSX.Element> = {
    'NG': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="1" height="2" fill="#008751"/>
        <rect x="1" width="1" height="2" fill="#ffffff"/>
        <rect x="2" width="1" height="2" fill="#008751"/>
      </svg>
    ),
    'KE': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="0.4" fill="#000000"/>
        <rect y="0.4" width="3" height="0.4" fill="#ffffff"/>
        <rect y="0.8" width="3" height="0.4" fill="#cc0000"/>
        <rect y="1.2" width="3" height="0.4" fill="#ffffff"/>
        <rect y="1.6" width="3" height="0.4" fill="#007a3d"/>
      </svg>
    ),
    'ZA': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="2" fill="#007749"/>
        <polygon points="0,0 1.2,0.5 1.2,1.5 0,2" fill="#001489"/>
        <polygon points="0,0 0.8,0.33 0.8,1.67 0,2" fill="#ffb612"/>
        <rect y="0.33" width="3" height="0.33" fill="#ffffff"/>
        <rect y="1.33" width="3" height="0.33" fill="#de3831"/>
      </svg>
    ),
    'GH': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="0.67" fill="#ce1126"/>
        <rect y="0.67" width="3" height="0.67" fill="#fcd116"/>
        <rect y="1.33" width="3" height="0.67" fill="#006b3f"/>
        <polygon points="1.5,0.67 1.65,1.1 2.1,1.1 1.725,1.35 1.875,1.79 1.5,1.55 1.125,1.79 1.275,1.35 0.9,1.1 1.35,1.1" fill="#000000"/>
      </svg>
    ),
    'US': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="2" fill="#b22234"/>
        <rect y="0.15" width="3" height="0.15" fill="#ffffff"/>
        <rect y="0.46" width="3" height="0.15" fill="#ffffff"/>
        <rect y="0.77" width="3" height="0.15" fill="#ffffff"/>
        <rect y="1.08" width="3" height="0.15" fill="#ffffff"/>
        <rect y="1.39" width="3" height="0.15" fill="#ffffff"/>
        <rect y="1.7" width="3" height="0.15" fill="#ffffff"/>
        <rect width="1.2" height="1" fill="#3c3b6e"/>
      </svg>
    ),
    'CA': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="1" height="2" fill="#ff0000"/>
        <rect x="1" width="1" height="2" fill="#ffffff"/>
        <rect x="2" width="1" height="2" fill="#ff0000"/>
        <polygon points="1.5,0.5 1.4,0.8 1.1,0.7 1.35,0.95 1.25,1.25 1.5,1.1 1.75,1.25 1.65,0.95 1.9,0.7 1.6,0.8" fill="#ff0000"/>
      </svg>
    ),
    'GB': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="2" fill="#012169"/>
        <polygon points="0,0 0.6,0 3,1.4 3,2 2.4,2 0,0.6" fill="#ffffff"/>
        <polygon points="0,2 0.6,2 3,0.6 3,0 2.4,0 0,1.4" fill="#ffffff"/>
        <rect x="1.2" width="0.6" height="2" fill="#ffffff"/>
        <rect y="0.7" width="3" height="0.6" fill="#ffffff"/>
        <polygon points="0,0 0.3,0 3,1.65 3,2 2.7,2 0,0.35" fill="#c8102e"/>
        <polygon points="0,2 0.3,2 3,0.35 3,0 2.7,0 0,1.65" fill="#c8102e"/>
        <rect x="1.35" width="0.3" height="2" fill="#c8102e"/>
        <rect y="0.85" width="3" height="0.3" fill="#c8102e"/>
      </svg>
    ),
    'IN': (
      <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="0.67" fill="#ff9933"/>
        <rect y="0.67" width="3" height="0.67" fill="#ffffff"/>
        <rect y="1.33" width="3" height="0.67" fill="#138808"/>
        <circle cx="1.5" cy="1" r="0.2" fill="#000080" stroke="#000080" strokeWidth="0.02"/>
      </svg>
    )
  };

  const defaultFlag = (
    <svg viewBox="0 0 3 2" className={className}>
      <rect width="3" height="2" fill="#cccccc"/>
      <text x="1.5" y="1.2" textAnchor="middle" fontSize="0.5" fill="#666">🌍</text>
    </svg>
  );

  return flagSvgs[countryCode] || defaultFlag;
};

export default FlagIcon;