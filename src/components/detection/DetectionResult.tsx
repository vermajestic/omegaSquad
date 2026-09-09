import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';
import type { SpillDetection } from '@/types';
import { formatCoordinates, formatArea, formatConfidence, formatDateTime } from '@/utils';
import { Button } from '@/components/common/Button';

interface DetectionResultProps {
  detection?: SpillDetection;
  incidentId?: string;
  className?: string;
}

export const DetectionResult: React.FC<DetectionResultProps> = ({
  detection,
  incidentId = 'OS-2026-DEMO-041',
  className = '',
}) => {
  const navigate = useNavigate();
  const conf = detection?.confidence ?? 94.2;
  const area = detection?.estimatedArea ?? 12.4;
  const coords = detection?.coordinates ?? { lat: 18.7421, lng: 67.8214 };
  const sat = detection?.satellite ?? 'Sentinel-1';
  const sensor = detection?.sensor ?? 'SAR';
  const time = detection?.detectionTime ?? '2026-09-04T18:42:00Z';

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      {/* Header with Status Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">INCIDENT ID: {incidentId}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800/80 font-bold uppercase">
              Confirmed Anomaly
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Marine Hydrocarbon Slick Detected
          </h3>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">Confidence</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {formatConfidence(conf)}
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Center Position</span>
          </div>
          <div className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold truncate">
            {formatCoordinates(coords.lat, coords.lng)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-red-400" />
            <span>Surface Area</span>
          </div>
          <div className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold">
            {formatArea(area)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Acquisition</span>
          </div>
          <div className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold truncate">
            {formatDateTime(time)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Sensor Mode</span>
          </div>
          <div className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold">
            {sat} ({sensor} C-Band)
          </div>
        </div>
      </div>

      {/* Dual Hindcast & Forecast Drift Status Panel */}
      <div className="rounded-lg bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900/80 dark:to-slate-900/40 border border-slate-200 dark:border-slate-800 mb-5 overflow-hidden">
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0d1320]/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Drift Simulation Telemetry</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">RATE: 1.2kts @ 142° SE</span>
        </div>
        
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ⏪ Backward Hindcast (Origin Estimate) */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Backward Hindcast (t0 Origin)
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-1">
                <span className="text-slate-500 dark:text-slate-400">Release Coordinate:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">18.7562° N, 67.8091° E</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-1">
                <span className="text-slate-500 dark:text-slate-400">Estimated Time (t0):</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">2026-09-04 14:15:00 UTC</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 dark:text-slate-400">Intersected Track:</span>
                <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold">MV Ocean Star (PCA)</span>
              </div>
            </div>
          </div>

          {/* ⏩ Forward Forecast */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Forward Forecast Trajectory
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-1">
                <span className="text-slate-500 dark:text-slate-400">+12h Projected:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">18.5550° N, 67.9550° E</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-1">
                <span className="text-slate-500 dark:text-slate-400">+24h Projected:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">18.3700° N, 68.0880° E</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 dark:text-slate-400">+48h Threat Level:</span>
                <span className="font-mono text-red-600 dark:text-red-400 font-semibold">High (Approaching Coast)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          Anomaly verified against historical biogenic slick false-positive library.
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(`/vessels/attribution/${incidentId}`)}
          className="w-full sm:w-auto shadow-xs"
        >
          <span>Correlate Responsible Vessel</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
