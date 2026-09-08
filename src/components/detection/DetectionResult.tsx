import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MapPin, Calendar, Compass, Wind, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    <div className={`rounded-xl bg-[#111827] border border-slate-800 p-5 shadow-xl ${className}`}>
      {/* Header with Status Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-cyan-400">INCIDENT ID: {incidentId}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/80 font-bold uppercase">
              Confirmed Anomaly
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Marine Hydrocarbon Slick Detected
          </h3>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 uppercase font-medium">Confidence</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {formatConfidence(conf)}
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Center Position</span>
          </div>
          <div className="text-xs font-mono text-slate-200 font-semibold truncate">
            {formatCoordinates(coords.lat, coords.lng)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Surface Area</span>
          </div>
          <div className="text-xs font-mono text-slate-200 font-semibold">
            {formatArea(area)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Acquisition</span>
          </div>
          <div className="text-xs font-mono text-slate-200 font-semibold truncate">
            {formatDateTime(time)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Sensor Mode</span>
          </div>
          <div className="text-xs font-mono text-slate-200 font-semibold">
            {sat} ({sensor} C-Band)
          </div>
        </div>
      </div>

      {/* Environmental Drift Vector */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-slate-800 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Ocean Current & Wind Drift Vector</div>
            <div className="text-[11px] text-slate-400">
              Drift speed: <span className="font-mono text-slate-200">1.2 kts</span> • Bearing: <span className="font-mono text-slate-200">142° SE</span> • Sea state: <span className="font-mono text-slate-200">Moderate (Beaufort 3)</span>
            </div>
          </div>
        </div>
        <span className="hidden sm:inline-flex text-[11px] text-cyan-400 items-center gap-1 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" /> Drift-Adjusted
        </span>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Anomaly verified against historical biogenic slick false-positive library.
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(`/vessels/attribution/${incidentId}`)}
          className="w-full sm:w-auto shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <span>Correlate Responsible Vessel</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
