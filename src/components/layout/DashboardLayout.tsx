import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tv, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { DemoBanner } from '@/components/common/DemoBanner';
import { useAppContext } from '@/contexts/AppContext';

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isDemoMode, isPresentationMode, togglePresentationMode } = useAppContext();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/overview')) return { title: 'Overview', subtitle: 'Global Marine Intelligence' };
    if (path.includes('/monitoring')) return { title: 'Live Monitoring', subtitle: 'Real-time coastal surveillance' };
    if (path.includes('/detection')) return { title: 'Spill Detection', subtitle: 'AI-powered SAR analysis' };
    if (path.includes('/incidents')) return { title: 'Incident Management', subtitle: 'Track and respond to anomalies' };
    if (path.includes('/vessels')) return { title: 'Vessel Intelligence', subtitle: 'AIS and tracking data' };
    if (path.includes('/satellite')) return { title: 'Satellite Explorer', subtitle: 'Sentinel-1 & Sentinel-2 imagery' };
    if (path.includes('/analytics')) return { title: 'Analytics', subtitle: 'Trends and metrics' };
    if (path.includes('/reports')) return { title: 'Reports', subtitle: 'Investigation documentation' };
    if (path.includes('/how-it-works')) return { title: 'How It Works', subtitle: 'System architecture' };
    if (path.includes('/settings')) return { title: 'Settings', subtitle: 'System configuration' };
    if (path.includes('/help')) return { title: 'Help & Reference', subtitle: 'Operator manual' };
    return { title: 'Ocean Sentinel', subtitle: 'Marine Intelligence' };
  };

  const { title, subtitle } = getPageTitle();

  return (
    <div className={`flex h-screen bg-slate-100 dark:bg-[#080c14] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-150 ${
      isPresentationMode ? 'presentation-mode' : ''
    }`}>
      <div className="hidden lg:flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed || isPresentationMode} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      <MobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <DemoBanner isVisible={isDemoMode} />
        
        <Header 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setMobileNavOpen(true)}
          showMenuButton={true}
        />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-slate-100/70 dark:bg-[#080c14]">
          <Outlet />
        </main>

        {/* Floating Exit Presentation Mode Pill */}
        {isPresentationMode && (
          <div className="fixed bottom-4 right-4 z-[4000]">
            <button
              onClick={togglePresentationMode}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors duration-150 border border-amber-400"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Exit Projector Mode</span>
              <X className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
