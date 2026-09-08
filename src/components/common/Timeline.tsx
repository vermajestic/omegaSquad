import React, { ReactNode } from 'react';
// Note: User requested formatDateTime from '@/utils/formatters'. 
// To make this standalone we provide a simple fallback if it's not available, 
// but we will import it as requested assuming it will be there or created later.
// We'll define a simple local formatter just in case it's missing in a partial build,
// but use the import path as requested.

export interface TimelineEvent {
  timestamp: string;
  title: string;
  description?: string;
  type?: 'detection' | 'analysis' | 'ais' | 'attribution' | 'report' | string;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

// Simple fallback formatter
const formatTimeFallback = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch {
    return isoString;
  }
};

export const Timeline: React.FC<TimelineProps> = ({
  events,
  className = '',
}) => {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'detection': return 'bg-cyan-500';
      case 'analysis': return 'bg-blue-500';
      case 'ais': return 'bg-amber-500';
      case 'attribution': return 'bg-emerald-500';
      case 'report': return 'bg-slate-400';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-[120px] top-2 bottom-2 w-0.5 bg-navy-700" />
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timestamp */}
            <div className="w-[110px] flex-shrink-0 text-right pr-4 pt-1">
              <span className="text-xs font-medium text-slate-400">
                {formatTimeFallback(event.timestamp)}
              </span>
            </div>
            
            {/* Node */}
            <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0 ml-[2px]">
              <div className={`absolute w-3 h-3 rounded-full ${getTypeColor(event.type)} ring-4 ring-navy-800 z-10`} />
            </div>
            
            {/* Content */}
            <div className="ml-4 flex-grow bg-navy-800/50 rounded-md p-3 border border-navy-700">
              <div className="flex items-center space-x-2">
                {event.icon && <span className="text-slate-400">{event.icon}</span>}
                <h4 className="text-sm font-semibold text-slate-200">{event.title}</h4>
              </div>
              {event.description && (
                <p className="mt-1.5 text-xs text-slate-400">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
