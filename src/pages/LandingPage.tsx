import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Satellite, 
  Cpu, 
  Compass, 
  FileCheck, 
  Eye, 
  Layers, 
  Radio, 
  Anchor,
  CheckCircle2
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0f1e] text-slate-100 overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Animated Maritime Background Grid & Radar Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Radial sonar rings */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/20"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-cyan-500/15"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full border border-cyan-500/10"></div>
        {/* Coordinate crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            SIH 2026 • Team omegaSquad
          </div>
          <Link
            to="/overview"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <span>Live Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Autonomous Maritime Environmental Defense Platform
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Detect. Trace. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
            Protect Our Oceans.
          </span>
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Empowering coast guards and maritime enforcement with AI-driven satellite SAR anomaly detection and forensic vessel trajectory attribution to eliminate untraced marine oil spills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/overview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Monitoring Console</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#111827] hover:bg-[#1a2332] text-slate-200 border border-slate-700/80 font-medium text-base transition-all hover:border-slate-600"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore Technical Architecture</span>
          </Link>
        </div>

        {/* Live Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-lg bg-[#111827]/70 border border-slate-800/90 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">94.2%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">AI Model Accuracy</div>
          </div>
          <div className="p-4 rounded-lg bg-[#111827]/70 border border-slate-800/90 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">10m</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">SAR Resolution</div>
          </div>
          <div className="p-4 rounded-lg bg-[#111827]/70 border border-slate-800/90 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">72 Hours</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">AIS Backtracking</div>
          </div>
          <div className="p-4 rounded-lg bg-[#111827]/70 border border-slate-800/90 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">&lt; 1.5s</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">Attribution Inference</div>
          </div>
        </div>
      </section>

      {/* How It Works: 4-Step Pipeline Flow */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/80 bg-[#0d1322]/50">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">End-To-End Operational Pipeline</h2>
          <h3 className="text-3xl font-bold text-white">From Satellite Swath to Legal Attribution</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-base mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              01
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-cyan-400" />
              SAR Satellite Feeds
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sentinel-1 C-band synthetic aperture radar provides 24/7 day-night all-weather monitoring unaffected by cloud cover or fog.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-base mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              02
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Deep AI Segmentation
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Computer vision models isolate dark surface anomalies, differentiating petroleum spills from biogenic slicks and wind lookalikes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-base mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              03
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              AIS Backtracking
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Autonomous spatio-temporal correlation correlates historical maritime vessel tracks within a 72-hour window of the spill event.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-base mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              04
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Forensic Attribution
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Weighted multi-factor scoring ranks responsible vessels, generating court-admissible dossiers with closest approach vectors.
            </p>
          </div>
        </div>
      </section>

      {/* Why Ocean Sentinel: Feature Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Core Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Engineered for Maritime Defense</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-2">Zero Blindspots</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Continuous radar tracking ensures night-time and monsoonal bilge-dumping can no longer evade detection.
            </p>
            <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> 24/7 SAR Capability
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
              <Anchor className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-2">Pinpoint Vessel Ranking</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Calculates closest approach distances down to hundreds of meters and cross-checks speed anomalies and draft changes.
            </p>
            <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Multi-factor Correlation
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-2">Instant Evidence Dossiers</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Automated PDF-ready report generation for coastal guard headquarters, international port authorities, and maritime tribunals.
            </p>
            <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> MARPOL Convention Ready
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Badges */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/80 text-center">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">
          Powered By Cutting-Edge Earth Observation & Machine Intelligence
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {['Copernicus Sentinel-1 (C-SAR)', 'Sentinel-2 Multispectral', 'Global AIS Feeds', 'PyTorch / UNet Architecture', 'Leaflet Spatial Engine', 'CartoDB Dark Matter', 'React 19 & Vite'].map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-md bg-[#111827] border border-slate-800 text-xs font-mono text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          Ocean Sentinel © 2026 • Marine Intelligence & Vessel Attribution Platform
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium">Team omegaSquad</span>
          <span className="text-slate-700">•</span>
          <span>Smart India Hackathon</span>
          <span className="text-slate-700">•</span>
          <Link to="/overview" className="text-cyan-400 hover:underline">
            Console
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
