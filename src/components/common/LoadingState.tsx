import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-cyan-500 animate-spin mb-3`} />
      {message && (
        <p className={`${textClasses[size]} text-slate-400 font-medium animate-pulse`}>
          {message}
        </p>
      )}
    </div>
  );
};
