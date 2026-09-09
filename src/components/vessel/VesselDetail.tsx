import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Anchor, 
  MapPin, 
  ArrowRight,
  Gauge
} from 'lucide-react';
import type { VesselCandidate } from '@/types';
import { formatDistance, formatConfidence } from '@/utils';
import { Button } from '@/components/common/Button';

interface VesselDetailProps {
  vessel: VesselCandidate;
  incidentId?: string;
  className?: string;
}

export const VesselDetail: React.FC<VesselDetailProps> = ({
  vessel,
  incidentId = 'OS-2026-DEMO-041',
  className = '',
}) => {
  const navigate = useNavigate();
  const name = vessel.name || vessel.vessel?.name || 'MV Ocean Star';
  const imo = vessel.imo || vessel.vessel?.imo || '9123456';
  const type = vessel.type || vessel.vessel?.type || 'Tanker';
  const isTop = vessel.rank === 1 || vessel.priority === 'high';
  const dist = vessel.distanceKm ?? vessel.distance ?? 2.1;
  const score = vessel.attributionScore ?? 87;

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">IMO {imo}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                isTop
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {isTop ? 'Rank #1 Suspect' : `${type} Class`}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Anchor className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            {name}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Attribution Match</span>
          <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
            {formatConfidence(score)}
          </div>
        </div>
      </div>

      {/* AIS Telemetry Snapshot */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Closest Approach
          </span>
          <div className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">
            {formatDistance(dist)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Offset: {vessel.timeOffset || '+02:14'}</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Gauge className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Transit Speed
          </span>
          <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-200">
            13.5 kts
          </div>
          <div className="text-[10px] text-rose-600 dark:text-red-400 mt-0.5 font-medium">Dropped from 14.2 kts</div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 mb-4">
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Vessel Category:</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">{type} (Aframax Class)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Flag State / Callsign:</span>
          <span className="font-mono text-slate-900 dark:text-slate-200">Panama (PA) • 3E2144</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">MMSI Transponder:</span>
          <span className="font-mono text-slate-900 dark:text-slate-200">354892000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Dimensions (LOA × Beam):</span>
          <span className="font-mono text-slate-900 dark:text-slate-200">244m × 42m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Current Draught / DWT:</span>
          <span className="font-mono text-slate-900 dark:text-slate-200">14.2m / 105,400 DWT</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Reported Destination:</span>
          <span className="font-medium text-cyan-600 dark:text-cyan-300">Mundra, IN (ETA: Sep 06)</span>
        </div>
      </div>

      {/* Action Footer */}
      <Button
        variant="primary"
        size="md"
        onClick={() => navigate(`/vessels/attribution/${incidentId}`)}
        className="w-full justify-center shadow-xs"
      >
        <span>View Complete Attribution Dossier</span>
        <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
    </div>
  );
};
