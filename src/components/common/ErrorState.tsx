import React from 'react';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  onUseDemoData?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  onUseDemoData,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-navy-800/50 rounded-lg border border-red-500/20 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 max-w-md">{message}</p>
      
      <div className="flex space-x-3">
        {onRetry && (
          <Button variant="secondary" onClick={onRetry} icon={<RefreshCw className="w-4 h-4" />}>
            Retry
          </Button>
        )}
        {onUseDemoData && (
          <Button variant="primary" onClick={onUseDemoData} icon={<Database className="w-4 h-4" />}>
            Use Demo Data
          </Button>
        )}
      </div>
    </div>
  );
};
