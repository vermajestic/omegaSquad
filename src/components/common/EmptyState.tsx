import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mb-4 border border-navy-700">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 max-w-sm">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
