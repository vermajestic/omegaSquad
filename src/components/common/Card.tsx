import React, { ReactNode } from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  className = '',
  children,
}) => {
  return (
    <div className={`bg-navy-800 border border-navy-700 rounded-md overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-4 py-3 border-b border-navy-700 flex justify-between items-center bg-navy-800">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0 ml-4">{action}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
