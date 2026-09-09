import React from 'react';
import type { AnalysisIndicator } from '@/types';
import { ProgressBar } from '@/components/common/ProgressBar';

interface AnalysisIndicatorsProps {
  indicators?: AnalysisIndicator[];
  className?: string;
}

const defaultIndicators: AnalysisIndicator[] = [
  {
    name: 'Dark Surface Backscatter Anomaly',
    score: 96,
    severity: 'high',
    description: 'Significant attenuation of microwave backscatter caused by capillary wave damping.',
  },
  {
    name: 'Geometric Shape & Elongation',
    score: 92,
    severity: 'high',
    description: 'High aspect ratio plume geometry characteristic of continuous vessel discharge.',
  },
  {
    name: 'Texture & Boundary Gradient',
    score: 88,
    severity: 'medium',
    description: 'Sharp slick boundary gradients distinguish from low-wind calm zones.',
  },
  {
    name: 'Environmental Wind Window Context',
    score: 95,
    severity: 'high',
    description: 'Surface wind measured at 5.8 m/s, strictly within optimal SAR detection envelope.',
  },
  {
    name: 'Multi-temporal Persistence',
    score: 85,
    severity: 'medium',
    description: 'Correlated across overlapping ascending/descending satellite passes.',
  },
];

export const AnalysisIndicators: React.FC<AnalysisIndicatorsProps> = ({
  indicators = defaultIndicators,
  className = '',
}) => {
  const getSeverityBadge = (sev?: string) => {
    switch (sev) {
      case 'high':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800';
      case 'medium':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800';
      case 'low':
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            Multi-Criteria Radar Verification
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deep neural network feature extraction weights
          </p>
        </div>
        <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-2 py-0.5 rounded">
          Model: UNet-SAR-v3
        </span>
      </div>

      <div className="space-y-4">
        {indicators.map((ind, idx) => {
          const score = ind.score ?? 80;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{ind.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border font-mono uppercase font-semibold ${getSeverityBadge(
                      ind.severity
                    )}`}
                  >
                    {ind.severity || 'high'}
                  </span>
                </div>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{score}%</span>
              </div>

              <ProgressBar value={score} showValue={false} height="sm" />

              {ind.description && (
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {ind.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
