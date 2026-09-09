import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  Radar, 
  FileWarning, 
  Ship, 
  Satellite, 
  BarChart3, 
  FileText, 
  GitBranch, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const mainNavItems = [
    { name: 'Overview', path: '/overview', icon: LayoutDashboard },
    { name: 'Live Monitoring', path: '/monitoring', icon: Radio },
    { name: 'Spill Detection', path: '/detection', icon: Radar },
    { name: 'Incidents', path: '/incidents', icon: FileWarning },
    { name: 'Vessel Intelligence', path: '/vessels', icon: Ship },
    { name: 'Satellite Explorer', path: '/satellite', icon: Satellite },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const bottomNavItems = [
    { name: 'How It Works', path: '/how-it-works', icon: GitBranch },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  const renderNavItems = (items: typeof mainNavItems) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-3.5 py-2.5 mx-2 rounded transition-colors duration-150 group relative ${
            isActive 
              ? 'bg-white dark:bg-[#131b2e] text-sky-700 dark:text-white border-l-2 border-sky-500 font-medium shadow-xs dark:shadow-none' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#131b2e]/60 hover:text-slate-950 dark:hover:text-slate-100'
          }`}
          title={isCollapsed ? item.name : undefined}
        >
          <Icon size={18} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-xs sm:text-sm whitespace-nowrap overflow-hidden tracking-tight">{item.name}</span>}
        </NavLink>
      );
    });
  };

  return (
    <aside 
      className={`bg-slate-50/90 dark:bg-[#0d1320] border-r border-slate-200 dark:border-[#1e293b] flex flex-col transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="h-14 flex items-center justify-center border-b border-slate-200 dark:border-[#1e293b] px-4">
        <Logo collapsed={isCollapsed} />
      </div>

      <nav aria-label="Main Navigation" className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {renderNavItems(mainNavItems)}
      </nav>

      <nav aria-label="Secondary Navigation" className="border-t border-slate-200 dark:border-[#1e293b] py-3 space-y-0.5">
        {renderNavItems(bottomNavItems)}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-[#1e293b] flex flex-col items-center gap-3">
        <button 
          onClick={onToggle}
          className="p-1.5 rounded hover:bg-slate-150 dark:hover:bg-[#131b2e] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        {!isCollapsed && (
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono px-2 py-0.5 bg-white dark:bg-[#080c14] rounded border border-slate-200 dark:border-[#1e293b]">
            Team omegaSquad
          </div>
        )}
      </div>
    </aside>
  );
};
