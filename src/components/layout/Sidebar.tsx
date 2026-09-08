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
          className={`flex items-center gap-3 px-4 py-3 mx-2 rounded transition-colors group relative ${
            isActive 
              ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' 
              : 'text-slate-400 hover:bg-navy-800 hover:text-slate-100'
          }`}
          title={isCollapsed ? item.name : undefined}
        >
          <Icon size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">{item.name}</span>}
        </NavLink>
      );
    });
  };

  return (
    <aside 
      className={`bg-navy-900 border-r border-navy-700 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="h-14 flex items-center justify-center border-b border-navy-700 px-4">
        <Logo collapsed={isCollapsed} />
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {renderNavItems(mainNavItems)}
      </div>

      <div className="border-t border-navy-700 py-4 space-y-1">
        {renderNavItems(bottomNavItems)}
      </div>

      <div className="p-4 border-t border-navy-700 flex flex-col items-center gap-4">
        <button 
          onClick={onToggle}
          className="p-2 rounded-full hover:bg-navy-800 text-slate-400 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        {!isCollapsed && (
          <div className="text-xs text-slate-500 font-medium px-2 py-1 bg-navy-950 rounded border border-navy-800">
            omegaSquad
          </div>
        )}
      </div>
    </aside>
  );
};
