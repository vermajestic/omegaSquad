import React, { useState } from 'react';
import { Satellite, Upload, Check } from 'lucide-react';
import type { SatelliteScene } from '@/types';
import { mockSatelliteScenes } from '@/data/mockSatellite';
import { formatDate } from '@/utils';
import { Button } from '@/components/common/Button';

interface SceneSelectorProps {
  selectedSceneId?: string;
  onSelectScene: (scene: SatelliteScene) => void;
  onSimulateUpload?: () => void;
  scenes?: SatelliteScene[];
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({
  selectedSceneId = 'scene-001',
  onSelectScene,
  onSimulateUpload,
  scenes = mockSatelliteScenes,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'SAR' | 'EO'>('ALL');

  const filteredScenes = scenes.filter(s => {
    if (filter === 'ALL') return true;
    return s.sensor === filter;
  });

  return (
    <div className="rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-4 shadow-xs dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
          <Satellite className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Satellite Scene Repository</span>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-800 text-[11px]">
          {(['ALL', 'SAR', 'EO'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-2 py-0.5 rounded font-semibold transition ${
                filter === mode ? 'bg-cyan-500 text-white dark:text-slate-950' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Scenes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
        {filteredScenes.slice(0, 4).map(scene => {
          const isSelected = scene.id === selectedSceneId;
          return (
            <div
              key={scene.id}
              onClick={() => onSelectScene(scene)}
              className={`p-2.5 rounded-lg border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-50/50 dark:bg-cyan-950/40 border-cyan-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{scene.id}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase ${
                  scene.sensor === 'SAR' ? 'bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800' : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800'
                }`}>
                  {scene.satellite} {scene.sensor}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                <div>{scene.region}</div>
                <div className="font-mono text-[10px] text-slate-500 dark:text-slate-500">{formatDate(scene.acquisitionDate)}</div>
              </div>
              {isSelected && (
                <div className="mt-1.5 flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                  <Check className="w-3 h-3" /> Active Scene
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Simulate Upload Action */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span className="text-slate-500 dark:text-slate-400">Custom GeoTIFF / Level-1 GRD product:</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={onSimulateUpload}
          className="text-xs"
        >
          <Upload className="w-3.5 h-3.5 mr-1" />
          <span>Upload Satellite Product</span>
        </Button>
      </div>
    </div>
  );
};
