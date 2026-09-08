import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 rounded-lg shadow-2xl p-3 text-xs text-slate-300 w-56">
      <div 
        className="flex items-center justify-between cursor-pointer font-semibold text-slate-200 select-none pb-1.5 border-b border-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Layers className="w-3.5 h-3.5" />
          Map Legend
        </span>
        <button className="text-slate-400 hover:text-slate-200">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2.5 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Spill Detections</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300 shadow-[0_0_8px_rgba(239,68,68,0.7)] flex-shrink-0 animate-pulse"></span>
            <span>High Confidence (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 flex-shrink-0"></span>
            <span>Medium Confidence (50–80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-500 border border-slate-400 flex-shrink-0"></span>
            <span>Low / Biogenic (&lt;50%)</span>
          </div>

          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pt-1.5 border-t border-slate-800/80">AIS Traffic</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-cyan-500 border border-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)] flex-shrink-0"></span>
            <span>Top Suspect Vessel (#1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-500 border border-blue-400 flex-shrink-0"></span>
            <span>Correlated Vessels</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-cyan-400 flex-shrink-0"></span>
            <span>Historical AIS Track</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-amber-400 bg-amber-400/30 flex-shrink-0"></span>
            <span>Point of Closest Approach</span>
          </div>
        </div>
      )}
    </div>
  );
};
