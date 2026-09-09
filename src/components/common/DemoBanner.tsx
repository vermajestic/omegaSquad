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
    <aside aria-label="Demo notice" className={`bg-amber-50 dark:bg-[#131b2e] border-b border-amber-200 dark:border-amber-500/30 px-4 py-1.5 flex items-center justify-between text-amber-800 dark:text-amber-300 text-xs font-mono font-medium ${className}`}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>SIMULATED OPERATIONAL FEED — Maritime Defense Demonstration</span>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="p-0.5 hover:bg-amber-200/60 dark:hover:bg-amber-500/20 rounded transition-colors text-amber-700 dark:text-amber-300"
        aria-label="Dismiss demo banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
