import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  collapsed?: boolean;
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ collapsed, to = '/', className = '' }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 cursor-pointer group hover:opacity-95 transition-opacity ${className}`}
      title="Return to Ocean Sentinel Homepage"
    >
      <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-150">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Signal Circles */}
          <circle cx="16" cy="12" r="8" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.2" fill="none" />
          <circle cx="16" cy="12" r="4" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
          <circle cx="16" cy="12" r="1.5" fill="#06b6d4" />
          {/* Wave Motif */}
          <path d="M4 22C7 22 8 20 12 20C16 20 17 22 20 22C23 22 25 20 28 20" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 26C7 26 8 24 12 24C16 24 17 26 20 26C23 26 25 24 28 24" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold tracking-wider text-sm text-slate-900 dark:text-white transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            OCEAN SENTINEL
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-widest uppercase font-mono font-medium transition-colors">
            Marine Intelligence
          </span>
        </div>
      )}
    </Link>
  );
};
