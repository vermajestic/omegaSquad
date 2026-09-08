import React from 'react';

export interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  showValue?: boolean;
  height?: 'sm' | 'md';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  color = 'cyan-500',
  showValue = true,
  height = 'sm',
  className = '',
}) => {
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs font-medium text-slate-400">{label}</span>}
          {showValue && <span className="text-xs font-medium text-slate-300">{Math.round(safeValue)}%</span>}
        </div>
      )}
      <div className={`w-full bg-navy-700 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div 
          className={`h-full rounded-full bg-${color} transition-all duration-300 ease-out`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};
