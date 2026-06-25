import React from 'react';
import { Plus, Minus, Crosshair } from 'lucide-react';

interface GlobeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
  locating?: boolean;
}

const GlobeControls = ({ onZoomIn, onZoomOut, onLocate, locating }: GlobeControlsProps) => (
  <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-1.5">
    <ControlButton onClick={onZoomIn} title="Zoom in">
      <Plus size={16} />
    </ControlButton>
    <ControlButton onClick={onZoomOut} title="Zoom out">
      <Minus size={16} />
    </ControlButton>
    <div className="h-px bg-white/15 my-0.5" />
    <ControlButton onClick={onLocate} title="Find my location" active={locating}>
      <Crosshair size={15} className={locating ? 'animate-pulse text-blue-400' : ''} />
    </ControlButton>
  </div>
);

const ControlButton = ({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all shadow-lg ${
      active
        ? 'bg-blue-600/80 border-blue-400/40 text-blue-200'
        : 'bg-black/60 backdrop-blur-xl border-white/15 text-white/70 hover:text-white hover:bg-black/80'
    }`}
  >
    {children}
  </button>
);

export default GlobeControls;
