import React from 'react';

const PlaneRouteOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      <svg
        className="absolute -left-10 top-1/3 w-[120%] h-40 animate-float-slow"
        viewBox="0 0 1200 200"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M 0 150 C 200 80, 400 220, 600 140 C 800 60, 1000 200, 1200 120"
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeDasharray="10 10"
          className="animate-path-dash"
        />
      </svg>
    </div>
  );
};

export default PlaneRouteOverlay;
