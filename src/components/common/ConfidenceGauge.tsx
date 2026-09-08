import React from 'react';

export interface ConfidenceGaugeProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  value,
  label,
  size = 'md',
  className = '',
}) => {
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  const getGradientColor = (val: number) => {
    if (val < 40) return 'from-red-500 to-amber-500';
    if (val < 70) return 'from-amber-500 to-cyan-500';
    if (val < 85) return 'from-cyan-500 to-emerald-400';
    return 'from-emerald-400 to-emerald-500';
  };

  const getTextColor = (val: number) => {
    if (val < 40) return 'text-red-400';
    if (val < 70) return 'text-amber-400';
    if (val < 85) return 'text-cyan-400';
    return 'text-emerald-400';
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <span className={`text-slate-400 font-medium ${textClasses[size]}`}>
          {label}
        </span>
      )}
      <div className="flex items-center space-x-3">
        <div className={`flex-grow bg-navy-700 rounded-full overflow-hidden ${heightClasses[size]}`}>
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getGradientColor(safeValue)} transition-all duration-500 ease-out`}
            style={{ width: `${safeValue}%` }}
          />
        </div>
        <span className={`font-bold ${getTextColor(safeValue)} ${textClasses[size]} w-9 text-right`}>
          {Math.round(safeValue)}%
        </span>
      </div>
    </div>
  );
};
