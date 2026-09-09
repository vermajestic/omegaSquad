import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Satellite, 
  Cpu, 
  Compass, 
  FileCheck, 
  Shield, 
  Radio, 
  Anchor,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { useAppContext } from '@/contexts/AppContext';

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-800 dark:text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans transition-colors">
      {/* Top Header */}
      <header className="border-b border-slate-200 dark:border-[#1e293b] bg-white/80 dark:bg-[#0d1320]/80 backdrop-blur-sm sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          
          <nav className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>EEZ Surveillance: Active</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-md bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b] text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
            
            <Link
              to="/overview"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold tracking-tight shadow-xs transition-colors duration-150"
            >
              <span>Command Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Asymmetric Hero: Left Editorial + Right Telemetry HUD */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column - 7 cols on large screens */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b] text-sky-600 dark:text-sky-400 text-xs font-mono font-medium uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5" />
                <span>Maritime Environmental Defense Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Autonomous Satellite SAR Spill Detection & Forensic Vessel Attribution.
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Detecting illegal bilge-dumping and deliberate petroleum discharges across Indian EEZ waters. Combining Copernicus Sentinel-1 radar feeds, deep UNet capillary wave damping analysis, and historical AIS trajectory correlation into court-admissible MARPOL dossiers.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/overview"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-xs transition-colors duration-150"
                >
                  <span>Launch Monitoring Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white dark:bg-[#0d1320] hover:bg-slate-100 dark:hover:bg-[#131b2e] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1e293b] font-medium text-sm transition-colors duration-150 shadow-xs"
                >
                  <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>System Architecture</span>
                </Link>
              </div>

              {/* High-Contrast Telemetry Readouts */}
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-[#1e293b]">
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">UNet Accuracy</dt>
                  <dd className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5 tabular-nums">94.2%</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">SAR Resolution</dt>
                  <dd className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">10m</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">AIS Window</dt>
                  <dd className="text-2xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-0.5 tabular-nums">72 Hours</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Attribution SLA</dt>
                  <dd className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5 tabular-nums">&lt; 1.5s</dd>
                </div>
              </dl>
            </div>

            {/* Right Column - 5 cols: Live SAR Telemetry Inspector Mockup */}
            <aside className="lg:col-span-5 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-md overflow-hidden font-mono text-xs">
              <header className="px-4 py-3 bg-slate-50 dark:bg-[#101726] border-b border-slate-200 dark:border-[#1e293b] flex items-center justify-between text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">SAR SENSOR TELEMETRY</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 font-semibold">
                  INGEST ACTIVE
                </span>
              </header>

              <div className="p-4 space-y-3.5 text-slate-700 dark:text-slate-300 bg-slate-50/40 dark:bg-[#080c14]/40">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-[#1e293b]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">CONSTELLATION</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">Sentinel-1A C-SAR</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">ACQUISITION MODE</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">Interferometric Wide (IW)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-[#1e293b]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">FREQUENCY / BAND</span>
                    <span className="text-slate-800 dark:text-slate-100">5.405 GHz (C-Band)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">POLARIZATION</span>
                    <span className="text-slate-800 dark:text-slate-100">VV + VH Co-polar</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-[#1e293b]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">TARGET SECTOR</span>
                    <span className="text-slate-800 dark:text-slate-100">Sector 4B (Mumbai High)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">INCIDENCE ANGLE</span>
                    <span className="text-slate-800 dark:text-slate-100 tabular-nums">34.2° mid-swath</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b] text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Real-time Capillary Damping</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">-12.4 dB</span>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 flex justify-between">
                  <span>ORBIT: 41295 / PASS 142</span>
                  <span>TIME: 2026-09-05 00:31 IST</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Operational Pipeline: Connected Asymmetric Timeline */}
        <section className="border-t border-slate-200 dark:border-[#1e293b] bg-slate-100/50 dark:bg-[#0d1320]/60 py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                Operational Investigation Pipeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                From Microwave Radar Swath to Court Prosecution
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Stage 1 */}
              <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-900/60">
                      PHASE 01
                    </span>
                    <Satellite className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    SAR Swath Ingestion
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Sentinel-1 C-band synthetic aperture radar pierces monsoonal cloud cover, providing all-weather day/night coverage of high-density tanker routes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e293b] text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Band: 5.405 GHz • 24/7 All-weather
                </div>
              </article>

              {/* Stage 2 */}
              <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/60">
                      PHASE 02
                    </span>
                    <Cpu className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    UNet Segmentation
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Deep neural models analyze capillary wave damping and backscatter drop off, eliminating biogenic slicks, grease ice, and low-wind lookalikes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e293b] text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Damping: &gt;6 dB • 10m Ground Res
                </div>
              </article>

              {/* Stage 3 */}
              <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-900/60">
                      PHASE 03
                    </span>
                    <Compass className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    AIS Corridor Backtracking
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Correlates historical AIS tracks within a 72-hour window. Calculates closest point of approach (CPA) and detects speed drops during discharge.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e293b] text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Corridor: 25-200 km • CPA &lt; 2.5 km
                </div>
              </article>

              {/* Stage 4 */}
              <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/60">
                      PHASE 04
                    </span>
                    <FileCheck className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    Forensic Attribution
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Generates MARPOL Annex I Tier-1 court-admissible dossiers with timestamped trajectory overlays and immutable chain-of-custody hashes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e293b] text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  MARPOL Annex I • SHA-256 Hash
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
              Mission Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Engineered for Coastal Defense & Port State Control
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Monsoonal Night-Time Defense</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                Vessels routinely time bilge discharges during monsoon storms or night hours to bypass optical cameras. Synthetic aperture radar provides 24/7 radar penetration.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> C-SAR All-Weather Radar
              </div>
            </article>

            <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">High-Precision CPA Vectoring</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                Determines closest point of approach down to meters, correlating vessel draught variations, speed anomalies, and rudder drift to build rock-solid evidence.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Multi-Pillar Correlation
              </div>
            </article>

            <article className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">MARPOL Enforcement Dossiers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                Automates generation of official 10-section legal investigation dossiers ready for Indian Coast Guard interceptor dispatch and international port detention.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Court-Admissible MARPOL 73/78
              </div>
            </article>
          </div>
        </section>

        {/* Technical Architecture Badges */}
        <section className="border-t border-slate-200 dark:border-[#1e293b] bg-slate-100/40 dark:bg-[#0d1320]/40 py-10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <span className="font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              EO & Forensic Infrastructure:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {['Copernicus Sentinel-1 (C-SAR)', 'Sentinel-2 Multispectral', 'Global AIS Feeds', 'PyTorch / UNet Architecture', 'Leaflet Spatial Engine', 'React 19 & Vite'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#1e293b] font-mono text-slate-700 dark:text-slate-300 text-[11px] shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Semantic Footer */}
      <footer className="border-t border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#080c14] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div>
            Ocean Sentinel © 2026 • AI-Powered Marine Oil Spill Intelligence & Vessel Attribution Platform
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-mono">Team omegaSquad</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Smart India Hackathon 2026</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link to="/overview" className="text-sky-600 dark:text-sky-400 hover:underline font-medium">
              Live Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
