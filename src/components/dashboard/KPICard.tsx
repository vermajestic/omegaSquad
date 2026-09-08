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
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      bgIcon: 'bg-cyan-500/10 text-cyan-400',
      textVal: 'text-cyan-400',
    },
    red: {
      border: 'border-red-500/20 hover:border-red-500/50',
      bgIcon: 'bg-red-500/10 text-red-400',
      textVal: 'text-red-400',
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/50',
      bgIcon: 'bg-amber-500/10 text-amber-400',
      textVal: 'text-amber-400',
    },
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/50',
      bgIcon: 'bg-blue-500/10 text-blue-400',
      textVal: 'text-blue-400',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/50',
      bgIcon: 'bg-emerald-500/10 text-emerald-400',
      textVal: 'text-emerald-400',
    },
  };

  const currentTheme = colorMap[variant] || colorMap.cyan;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-[#111827] border ${currentTheme.border} p-4 transition-all duration-200 shadow-lg ${
        onClick ? 'cursor-pointer hover:bg-[#1a2332]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className={`mt-2 text-2xl sm:text-3xl font-bold font-mono ${currentTheme.textVal}`}>
            {value}
          </div>
        </div>
        <div className={`rounded-lg p-2.5 ${currentTheme.bgIcon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtext || change) && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
          {change && (
            <span
              className={`font-semibold font-mono ${
                isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {change}
            </span>
          )}
          {subtext && <span className="truncate">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
