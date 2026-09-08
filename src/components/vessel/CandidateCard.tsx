import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { VesselCandidate } from '@/types';
import { formatDistance, formatConfidence } from '@/utils';

interface CandidateCardProps {
  candidate: VesselCandidate;
  rank?: number;
  isSelected?: boolean;
  onSelect?: (candidate: VesselCandidate) => void;
  onInspectAttribution?: (candidate: VesselCandidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  rank = 1,
  isSelected = false,
  onSelect,
  onInspectAttribution,
}) => {
  const isTop = rank === 1 || candidate.priority === 'high';
  const name = candidate.name || candidate.vessel?.name || 'Unknown Vessel';
  const type = candidate.type || candidate.vessel?.type || 'Tanker';
  const imo = candidate.imo || candidate.vessel?.imo || 'N/A';
  const dist = candidate.distanceKm ?? candidate.distance ?? 0;
  const score = candidate.attributionScore ?? 0;

  return (
    <div
      onClick={() => onSelect && onSelect(candidate)}
      className={`rounded-xl p-4 transition-all border cursor-pointer ${
        isSelected
          ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
          : isTop
          ? 'bg-[#111827] border-cyan-500/40 hover:border-cyan-500/70'
          : 'bg-[#111827] border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
              isTop ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            #{rank}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>{name}</span>
              {isTop && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-800 font-semibold uppercase">
                  Primary Suspect
                </span>
              )}
            </h4>
            <div className="text-[11px] text-slate-400 font-mono">
              IMO: {imo} • {type}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500">Score</span>
          <div className="text-base font-bold font-mono text-cyan-400">
            {formatConfidence(score)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs py-2 my-2 border-y border-slate-800/80 text-slate-300">
        <div>
          <span className="text-slate-500">Proximity: </span>
          <span className="font-mono text-amber-400 font-semibold">{formatDistance(dist)}</span>
        </div>
        <div>
          <span className="text-slate-500">Offset: </span>
          <span className="font-mono">{candidate.timeOffset || candidate.timeDifference || 'N/A'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-400 font-mono">
          Track Match: <strong className="text-slate-200">{candidate.trackMatchScore ?? candidate.trackMatch ?? 0}%</strong>
        </span>

        {onInspectAttribution && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspectAttribution(candidate);
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
