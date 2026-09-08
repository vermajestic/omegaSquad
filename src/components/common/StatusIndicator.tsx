import React from 'react';

export interface StatusIndicatorProps {
  status: 'operational' | 'degraded' | 'offline' | 'unknown';
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showLabel = true,
  className = '',
}) => {
  const statusConfig = {
    operational: { color: 'bg-emerald-500', pulse: true, defaultLabel: 'Operational' },
    degraded: { color: 'bg-amber-500', pulse: false, defaultLabel: 'Degraded' },
    offline: { color: 'bg-red-500', pulse: false, defaultLabel: 'Offline' },
    unknown: { color: 'bg-slate-500', pulse: false, defaultLabel: 'Unknown' },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        {config.pulse && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${config.color}`} />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${config.color}`} />
      </div>
      {showLabel && (
        <span className="ml-2 text-xs font-medium text-slate-300">
          {displayLabel}
        </span>
      )}
    </div>
  );
};
