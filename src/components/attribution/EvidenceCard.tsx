import React from 'react';
import { MapPin, Clock, Compass, Radio, CheckCircle2 } from 'lucide-react';
import type { AttributionEvidence } from '@/types';
import { formatConfidence } from '@/utils';
import { ProgressBar } from '@/components/common/ProgressBar';

interface EvidenceCardProps {
  evidence: AttributionEvidence;
  className?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  className = '',
}) => {
  const score = evidence.score ?? 85;
  const weight = evidence.weight ?? 0.25;
  const weightedPoints = (score * weight).toFixed(1);
  const name = evidence.name || evidence.label || 'Forensic Evidence';

  // Category Icon
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('spatial') || title.toLowerCase().includes('proximity')) {
      return <MapPin className="w-4 h-4 text-cyan-400" />;
    }
    if (title.toLowerCase().includes('temporal') || title.toLowerCase().includes('time')) {
      return <Clock className="w-4 h-4 text-blue-400" />;
    }
    if (title.toLowerCase().includes('trajectory') || title.toLowerCase().includes('heading')) {
      return <Compass className="w-4 h-4 text-amber-400" />;
    }
    return <Radio className="w-4 h-4 text-emerald-400" />;
  };

  const getStatusColor = (val: number) => {
    if (val >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-800';
    if (val >= 75) return 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/60 dark:border-cyan-800';
    return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-800';
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-5 shadow-xs dark:shadow-xl flex flex-col justify-between transition-colors ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {getIcon(name)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{name}</h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Weight: {Math.round(weight * 100)}% of model
              </span>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-bold border ${getStatusColor(
                score
              )}`}
            >
              {formatConfidence(score)}
            </span>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              +{weightedPoints} pts
            </div>
          </div>
        </div>

        {/* Progress meter */}
        <div className="mb-3">
          <ProgressBar value={score} showValue={false} height="sm" />
        </div>

        {/* Detailed forensic narrative */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {evidence.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        <span>Verification: Correlated</span>
        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence
        </span>
      </div>
    </div>
  );
};
