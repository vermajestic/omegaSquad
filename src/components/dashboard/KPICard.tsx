import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  variant?: 'cyan' | 'red' | 'amber' | 'blue' | 'emerald';
  onClick?: () => void;
}


export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  change,
  isPositive,
  icon: Icon,
  variant = 'cyan',
  onClick,
}) => {
  const accentMap = {
    cyan: 'text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-slate-900/60',
    red: 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-slate-900/60',
    amber: 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-slate-900/60',
    blue: 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-slate-900/60',
    emerald: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-slate-900/60',
  };

  const accentClass = accentMap[variant] || accentMap.cyan;

  return (
    <article
      onClick={onClick}
      className={`relative rounded-lg bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-4 flex flex-col justify-between shadow-xs dark:shadow-none transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-[#131b2e]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
          {title}
        </span>
        <div className={`p-1.5 rounded border ${accentClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2.5">
        <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
          {value}
        </div>

        {(subtext || change) && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-[#1e293b] pt-2">
            {change && (
              <span
                className={`font-semibold font-mono text-[11px] px-1.5 py-0.5 rounded ${
                  isPositive 
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-transparent' 
                    : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-transparent'
                }`}
              >
                {change}
              </span>
            )}
            {subtext && <span className="truncate text-slate-600 dark:text-slate-300 font-normal">{subtext}</span>}
          </div>
        )}
      </div>
    </article>
  );
};
