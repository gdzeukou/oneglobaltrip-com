import React from 'react';

interface PassportStampsProps {
  slideKey: string | number;
}

const PassportStamps: React.FC<PassportStampsProps> = ({ slideKey }) => {
  // Using key on positioned elements to retrigger subtle entrance per slide
  return (
    <div className="pointer-events-none absolute inset-0">
      <div key={`stamp-1-${slideKey}`} className="absolute top-16 right-10 rotate-[-8deg]">
        <div className="rounded-full border border-white/40 text-white/70 px-3 py-1 text-xs backdrop-blur-sm bg-background/20 animate-stamp-in">
          VISA APPROVED
        </div>
      </div>
      <div key={`stamp-2-${slideKey}`} className="absolute bottom-28 left-12 rotate-[6deg]">
        <div className="rounded-md border border-white/30 text-white/70 px-2.5 py-1 text-[10px] tracking-widest backdrop-blur-sm bg-background/20 animate-stamp-in delay-200">
          IMMIGRATION
        </div>
      </div>
    </div>
  );
};

export default PassportStamps;
