import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 dark:bg-[#0d1320]/95 backdrop-blur-md border border-slate-200 dark:border-[#1e293b] rounded-lg shadow-md dark:shadow-none p-3 text-xs text-slate-700 dark:text-slate-300 w-56 transition-colors duration-150">
      <div 
        className="flex items-center justify-between cursor-pointer font-semibold text-slate-800 dark:text-slate-200 select-none pb-1.5 border-b border-slate-100 dark:border-[#1e293b]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-sans">
          <Layers className="w-3.5 h-3.5" />
          Map Legend
        </span>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2.5 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Spill Detections</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600 dark:border-rose-400 flex-shrink-0"></span>
            <span>High Confidence (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-600 dark:border-amber-400 flex-shrink-0"></span>
            <span>Medium Confidence (50–80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500 flex-shrink-0"></span>
            <span>Low / Biogenic (&lt;50%)</span>
          </div>

          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pt-1.5 border-t border-slate-100 dark:border-[#1e293b]">AIS Traffic</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-sky-500 border border-sky-600 dark:border-sky-400 flex-shrink-0"></span>
            <span>Top Suspect Vessel (#1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 border border-blue-600 dark:border-blue-400 flex-shrink-0"></span>
            <span>Correlated Vessels</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-sky-500 dark:border-sky-400 flex-shrink-0"></span>
            <span>Historical AIS Track</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-amber-500 bg-amber-400/30 flex-shrink-0"></span>
            <span>Point of Closest Approach</span>
          </div>
        </div>
      )}
    </div>
  );
};
