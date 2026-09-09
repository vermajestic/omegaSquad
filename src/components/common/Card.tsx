import React, { ReactNode } from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: 'none' | 'condensed' | 'default' | 'relaxed';
  as?: 'section' | 'article' | 'div';
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  padding = 'default',
  as: Component = 'section',
  className = '',
  children,
}) => {
  const paddingStyles = {
    none: 'p-0',
    condensed: 'p-3',
    default: 'p-4 sm:p-5',
    relaxed: 'p-6',
  };

  return (
    <Component className={`bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] rounded-lg overflow-hidden shadow-xs dark:shadow-none text-slate-800 dark:text-slate-100 transition-colors duration-150 ${className}`}>
      {(title || action) && (
        <header className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200 dark:border-[#1e293b] flex justify-between items-center bg-slate-50/80 dark:bg-[#101726]/60">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0 ml-3">{action}</div>}
        </header>
      )}
      <div className={paddingStyles[padding]}>
        {children}
      </div>
    </Component>
  );
};
