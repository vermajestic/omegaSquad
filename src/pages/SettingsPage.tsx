import React, { useState } from 'react';
import { 
  Sliders, 
  Database, 
  Server, 
  ShieldCheck, 
  Tv, 
  Check, 
  RotateCcw, 
  Save,
  Sun,
  Moon
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/common/Button';

export const SettingsPage: React.FC = () => {
  const { 
    isDemoMode, 
    toggleDemoMode, 
    isPresentationMode, 
    togglePresentationMode,
    theme,
    setTheme
  } = useAppContext();

  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/v1');
  const [confThreshold, setConfThreshold] = useState(75);
  const [defaultRadius, setDefaultRadius] = useState('100 km');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Attribution default weights
  const [weights, setWeights] = useState({
    spatial: 30,
    temporal: 25,
    trajectory: 25,
    ais: 20,
  });

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    setApiUrl('http://localhost:8000/api/v1');
    setConfThreshold(75);
    setDefaultRadius('100 km');
    setWeights({ spatial: 30, temporal: 25, trajectory: 25, ais: 20 });
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
              System Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Platform Settings & Thresholds
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure visual appearance, data ingestion endpoints, AI detection sensitivity, and presentation mode
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <Check className="w-4 h-4" /> Preferences Saved
          </div>
        )}
      </div>

      {/* Theme Appearance Selector */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Display Theme & Interface Mode</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Choose between dark tactical monitoring for low-light ops rooms or crisp corporate light mode for daylight briefings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-left transition flex items-start gap-3.5 ${
              theme === 'dark'
                ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 text-white'
                : 'bg-slate-100 dark:bg-[#131b2e] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-2">
                <span>Dark Tactical Mode</span>
                {theme === 'dark' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">Active</span>}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Deep obsidian & navy surfaces with CartoDB Dark Matter basemaps. Reduced glare for 24/7 watchkeeping.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-left transition flex items-start gap-3.5 ${
              theme === 'light'
                ? 'bg-sky-50/50 border-sky-600 ring-2 ring-sky-500/20 text-slate-900'
                : 'bg-slate-100 dark:bg-[#131b2e] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-sky-100 text-sky-700 border border-sky-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-2">
                <span>Light Professional Mode</span>
                {theme === 'light' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-mono">Active</span>}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Crisp high-contrast white & slate canvas with CartoDB Voyager maritime tiles. High readability for reports.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mode Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Demo Mode Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-xl flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Simulated Demo Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When active, the platform uses preloaded Sentinel-1 SAR imagery and Arabian Sea AIS tracks for hackathon demonstrations without needing a live backend.
            </p>
            <div className="mt-2 text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
              Status: <strong>{isDemoMode ? 'SIMULATED DATA ACTIVE' : 'LIVE API INGESTION'}</strong>
            </div>
          </div>

          <button
            onClick={toggleDemoMode}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center flex-shrink-0 ${
              isDemoMode ? 'bg-cyan-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-950 shadow-md" />
          </button>
        </div>

        {/* Presentation Mode Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-xl flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tv className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Projector Presentation Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enhances font scales and contrast tokens to optimize readability during live auditorium, projector, and screen-share presentations.
            </p>
            <div className="mt-2 text-[11px] font-mono text-amber-600 dark:text-amber-400">
              Status: <strong>{isPresentationMode ? 'PROJECTOR MODE ENABLED' : 'STANDARD DISPLAY'}</strong>
            </div>
          </div>

          <button
            onClick={togglePresentationMode}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center flex-shrink-0 ${
              isPresentationMode ? 'bg-amber-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-950 shadow-md" />
          </button>
        </div>
      </div>

      {/* Backend API Configuration */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            API Ingestion Endpoint
          </h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Backend REST Service Base URL</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="http://localhost:8000/api/v1"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Directs requests to Python FastAPI / PyTorch inference service when demo mode is disabled.
          </p>
        </div>
      </div>

      {/* Algorithmic Sensitivity */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs dark:shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Algorithmic Calibration & Thresholds
          </h3>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Spill Alert Minimum Confidence</span>
            <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{confThreshold}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="95"
            value={confThreshold}
            onChange={(e) => setConfThreshold(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>Lenient (30%)</span>
            <span>Recommended Default (75%)</span>
            <span>Strict (95%)</span>
          </div>
        </div>

        {/* Default Search Radius */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Default AIS Corridor Radius</label>
          <select
            value={defaultRadius}
            onChange={(e) => setDefaultRadius(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="25 km">25 km (Localized Coastal Search)</option>
            <option value="50 km">50 km (Standard Sector Search)</option>
            <option value="100 km">100 km (Recommended Open-Ocean Corridor)</option>
            <option value="200 km">200 km (Wide-Area Basin Search)</option>
          </select>
        </div>

        {/* Attribution Weights Default Configuration */}
        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-700 dark:text-slate-300 font-medium block">
            Baseline Attribution Weights (Spatial: {weights.spatial}%, Temporal: {weights.temporal}%, Trajectory: {weights.trajectory}%, AIS: {weights.ais}%)
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                <span>Spatial Proximity</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{weights.spatial}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.spatial}
                onChange={(e) => setWeights(prev => ({ ...prev, spatial: parseInt(e.target.value, 10) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                <span>Temporal Window</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{weights.temporal}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.temporal}
                onChange={(e) => setWeights(prev => ({ ...prev, temporal: parseInt(e.target.value, 10) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" size="md" onClick={handleReset} className="text-xs">
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          <span>Reset Defaults</span>
        </Button>

        <Button variant="primary" size="md" onClick={handleSave} className="text-xs shadow-sm">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          <span>Save Preferences</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
