import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export interface DemoBannerProps {
  isVisible: boolean;
  className?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  isVisible,
  className = '',
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!isVisible || dismissed) {
    return null;
  }

  return (
    <div className={`bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-amber-500 text-xs font-medium ${className}`}>
      <div className="flex items-center">
        <AlertCircle className="w-3.5 h-3.5 mr-2" />
        <span>DEMO MODE — Using simulated data</span>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="p-0.5 hover:bg-amber-500/20 rounded transition-colors"
        aria-label="Dismiss demo banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
