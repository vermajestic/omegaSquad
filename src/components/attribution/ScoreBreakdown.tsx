import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';
import type { AttributionEvidence } from '@/types';
import { formatConfidence } from '@/utils';

interface ScoreBreakdownProps {
  evidenceList?: AttributionEvidence[];
  initialScore?: number;
  onWeightsChange?: (newScore: number) => void;
  className?: string;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  evidenceList: _evidenceList = [],
  initialScore = 87,
  onWeightsChange,
  className = '',
}) => {
  // Default weights matching implementation plan
  const [weights, setWeights] = useState<Record<string, number>>({
    spatial: 30,
    temporal: 25,
    trajectory: 25,
    ais: 20,
  });

  const rawScores = {
    spatial: 94,
    temporal: 88,
    trajectory: 91,
    ais: 96,
  };

  // Calculate normalized composite score based on current weights
  const totalWeight = weights.spatial + weights.temporal + weights.trajectory + weights.ais;
  const computedScore = totalWeight > 0
    ? (
        (rawScores.spatial * weights.spatial) +
        (rawScores.temporal * weights.temporal) +
        (rawScores.trajectory * weights.trajectory) +
        (rawScores.ais * weights.ais)
      ) / totalWeight
    : initialScore;

  const handleWeightChange = (key: string, val: number) => {
    const updated = { ...weights, [key]: val };
    setWeights(updated);
    if (onWeightsChange) {
      const sumW = updated.spatial + updated.temporal + updated.trajectory + updated.ais;
      const newScore = sumW > 0
        ? (
            (rawScores.spatial * updated.spatial) +
            (rawScores.temporal * updated.temporal) +
            (rawScores.trajectory * updated.trajectory) +
            (rawScores.ais * updated.ais)
          ) / sumW
        : initialScore;
      onWeightsChange(Math.round(newScore * 10) / 10);
    }
  };

  const handleReset = () => {
    const def = { spatial: 30, temporal: 25, trajectory: 25, ais: 20 };
    setWeights(def);
    if (onWeightsChange) onWeightsChange(87.1);
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Interactive Attribution Weight Simulator
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calibrate multi-factor criteria weights to evaluate attribution sensitivity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Composite Score</span>
            <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
              {formatConfidence(computedScore)}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition shadow-2xs"
            title="Reset to Default Weights"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stacked Percentage Visual Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
          <span>Model Weight Distribution</span>
          <span>Total: 100%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div
            className="bg-cyan-500 transition-all duration-300"
            style={{ width: `${(weights.spatial / totalWeight) * 100}%` }}
            title="Spatial Proximity"
          />
          <div
            className="bg-blue-500 transition-all duration-300"
            style={{ width: `${(weights.temporal / totalWeight) * 100}%` }}
            title="Temporal Correlation"
          />
          <div
            className="bg-amber-500 transition-all duration-300"
            style={{ width: `${(weights.trajectory / totalWeight) * 100}%` }}
            title="Trajectory Consistency"
          />
          <div
            className="bg-emerald-500 transition-all duration-300"
            style={{ width: `${(weights.ais / totalWeight) * 100}%` }}
            title="AIS Continuity"
          />
        </div>
      </div>

      {/* 4 Interactive Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Spatial Proximity */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Spatial Proximity</span>
            </div>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{weights.spatial}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={weights.spatial}
            onChange={(e) => handleWeightChange('spatial', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Raw Score: {rawScores.spatial}%</span>
            <span>Contr: {((rawScores.spatial * weights.spatial) / totalWeight).toFixed(1)} pts</span>
          </div>
        </div>

        {/* Temporal Correlation */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Temporal Correlation</span>
            </div>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{weights.temporal}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={weights.temporal}
            onChange={(e) => handleWeightChange('temporal', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Raw Score: {rawScores.temporal}%</span>
            <span>Contr: {((rawScores.temporal * weights.temporal) / totalWeight).toFixed(1)} pts</span>
          </div>
        </div>

        {/* Trajectory Consistency */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Trajectory Consistency</span>
            </div>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{weights.trajectory}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={weights.trajectory}
            onChange={(e) => handleWeightChange('trajectory', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Raw Score: {rawScores.trajectory}%</span>
            <span>Contr: {((rawScores.trajectory * weights.trajectory) / totalWeight).toFixed(1)} pts</span>
          </div>
        </div>

        {/* AIS Continuity */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">AIS Continuity</span>
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{weights.ais}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={weights.ais}
            onChange={(e) => handleWeightChange('ais', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Raw Score: {rawScores.ais}%</span>
            <span>Contr: {((rawScores.ais * weights.ais) / totalWeight).toFixed(1)} pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
