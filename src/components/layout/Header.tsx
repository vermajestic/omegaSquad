import { Bell, Menu, Tv, Database } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick, showMenuButton }) => {
  const { lastSyncTime, isDemoMode, toggleDemoMode, isPresentationMode, togglePresentationMode } = useAppContext();

  return (
    <header className="h-14 bg-[#111827] border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-20">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-slate-100">
            <Menu size={22} />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-semibold text-slate-100 leading-tight">{title}</h1>
          {subtitle && <span className="text-[11px] text-slate-400">{subtitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        {/* Presentation Mode Toggle Button */}
        <button
          onClick={togglePresentationMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
            isPresentationMode
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
          }`}
          title={isPresentationMode ? 'Exit Presentation Mode' : 'Enter Projector Presentation Mode'}
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isPresentationMode ? 'Projector ON' : 'Presentation'}</span>
        </button>

        {/* Demo Mode Toggle Badge */}
        <button
          onClick={toggleDemoMode}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition border ${
            isDemoMode
              ? 'bg-cyan-950/70 text-cyan-400 border-cyan-800/80'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
          title="Click to toggle Demo Mode"
        >
          <Database className="w-3 h-3" />
          <span>{isDemoMode ? 'Demo Mode' : 'Live Mode'}</span>
        </button>

        {/* Operational Badge & Sync Time */}
        <div className="hidden xl:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[11px] font-medium text-emerald-400">Surveillance Online</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Sync: {new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 text-slate-400 hover:text-slate-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
        </button>

        {/* User Badge */}
        <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold font-mono">
          OS
        </div>
      </div>
    </header>
  );
};
