import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Tv, 
  Database, 
  Sun, 
  Moon, 
  CheckCheck, 
  ShieldAlert, 
  Satellite, 
  Compass, 
  FileText, 
  Settings, 
  HelpCircle, 
  Radio, 
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  link: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High-Confidence Spill Detected',
    description: 'Arabian Sea Sector 4B anomaly measuring 12.4 km² flagged by Sentinel-1 SAR.',
    time: '4m ago',
    type: 'critical',
    link: '/incidents/OS-2026-DEMO-041',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'AIS Trajectory Anomaly',
    description: 'MV Ocean Star registered 13.5 kt speed dip at 2.1 km closest approach point.',
    time: '18m ago',
    type: 'warning',
    link: '/vessels/attribution/OS-2026-DEMO-041',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Copernicus SAR Ingestion Complete',
    description: 'Scene S1A_IW_GRDH_1SDV_20260904 Level-1 product radiometric calibration ready.',
    time: '42m ago',
    type: 'info',
    link: '/detection',
    read: false,
  },
  {
    id: 'notif-4',
    title: 'MARPOL Dossier Certified',
    description: 'Tier-1 enforcement report compiled for Indian Coast Guard Western Command.',
    time: '1h ago',
    type: 'success',
    link: '/reports/OS-2026-DEMO-041',
    read: true,
  },
];

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick, showMenuButton }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme, lastSyncTime, isDemoMode, toggleDemoMode, isPresentationMode, togglePresentationMode } = useAppContext();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNotifOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setIsNotifOpen(false);
    navigate(notif.link);
  };

  return (
    <header className="h-14 bg-white dark:bg-[#0d1320] border-b border-slate-200 dark:border-[#1e293b] flex items-center justify-between px-4 lg:px-6 z-30 transition-colors duration-150 relative">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button 
            onClick={onMenuClick} 
            className="lg:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">{title}</h1>
          {subtitle && <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{subtitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors border border-slate-200 dark:border-[#1e293b] bg-slate-50 hover:bg-slate-100 dark:bg-[#131b2e] dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        {/* Presentation Mode Toggle Button */}
        <button
          onClick={togglePresentationMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors border ${
            isPresentationMode
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-600/70 font-semibold'
              : 'bg-slate-50 dark:bg-[#131b2e] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          title={isPresentationMode ? 'Exit Presentation Mode' : 'Enter Projector Presentation Mode'}
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{isPresentationMode ? 'Projector ON' : 'Presentation'}</span>
        </button>

        {/* Demo Mode Toggle Badge */}
        <button
          onClick={toggleDemoMode}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors border ${
            isDemoMode
              ? 'bg-sky-50 dark:bg-[#131b2e] text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/60'
              : 'bg-slate-50 dark:bg-[#080c14] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1e293b]'
          }`}
          title="Click to toggle Demo Mode"
        >
          <Database className="w-3 h-3" />
          <span>{isDemoMode ? 'Demo Feed' : 'Live Feed'}</span>
        </button>

        {/* Operational Badge & Sync Time */}
        <div className="hidden xl:flex items-center gap-2.5 px-2.5 py-1 rounded bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">Surveillance Online</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
            Sync: {new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Notifications Dropdown Container */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsUserMenuOpen(false);
            }}
            className={`relative p-2 rounded-lg transition-all border ${
              isNotifOpen 
                ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800/60' 
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
            title="Operational Surveillance Alerts"
            aria-label="View notifications"
            aria-expanded={isNotifOpen}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            )}
          </button>

          {/* Notifications Flyout Panel */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    Surveillance Alerts
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck size={12} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                    No active surveillance alerts
                  </div>
                ) : (
                  notifications.map((n) => {
                    const getIcon = () => {
                      switch (n.type) {
                        case 'critical':
                          return <ShieldAlert className="w-4 h-4 text-rose-500 dark:text-rose-400" />;
                        case 'warning':
                          return <Compass className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
                        case 'info':
                          return <Satellite className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
                        case 'success':
                          return <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
                      }
                    };

                    return (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-sky-50/40 dark:bg-sky-950/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5">
                          {getIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                            {n.description}
                          </p>
                        </div>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2"></span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-3 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
                <Link
                  to="/incidents"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 text-[11px] py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span>View Incident Registry</span>
                  <ChevronRight size={12} />
                </Link>
                <Link
                  to="/monitoring"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-[11px] py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Live Radar Cockpit
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Operator Profile Menu Container */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotifOpen(false);
            }}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-semibold font-mono transition-all ${
              isUserMenuOpen 
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-xs' 
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#131b2e] dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-[#1e293b] hover:border-slate-300 dark:hover:border-slate-700'
            }`}
            title="Operator Profile & Station Commands"
            aria-label="Operator Menu"
            aria-expanded={isUserMenuOpen}
          >
            OS
          </button>

          {/* User Profile Flyout Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Operator Identity Card */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold font-mono text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                    OS
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      omegaSquad
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      SIH 2026 Project
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Navigation Links */}
              <div className="py-1 text-xs">
                <Link
                  to="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Platform Configuration & Tuning</span>
                </Link>

                <Link
                  to="/help"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <HelpCircle size={15} className="text-slate-400" />
                  <span>SOP Manual & MARPOL Primer</span>
                </Link>

                <Link
                  to="/how-it-works"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Radio size={15} className="text-slate-400" />
                  <span>Pipeline Architecture & UNet</span>
                </Link>
              </div>

              {/* Quick Session Actions */}
              <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 px-3 space-y-1">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-600" />}
                    <span>Theme</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{theme}</span>
                </button>

                <button
                  onClick={() => {
                    togglePresentationMode();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Tv size={14} className="text-cyan-500" />
                    <span>Projector Mode</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{isPresentationMode ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    toggleDemoMode();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Database size={14} className="text-blue-500" />
                    <span>Telemetry Feed</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{isDemoMode ? 'SIMULATED' : 'LIVE'}</span>
                </button>
              </div>

              {/* Station Info Footer */}
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 px-4 py-1 text-[10px] text-slate-400 font-mono flex justify-between">
                <span>Ocean Sentinel v2.4.0</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">HQ-W ONLINE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
