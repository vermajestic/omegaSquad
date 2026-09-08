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
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({
  selectedSceneId = 'scene-001',
  onSelectScene,
  onSimulateUpload,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'SAR' | 'EO'>('ALL');

  const filteredScenes = mockSatelliteScenes.filter(s => {
    if (filter === 'ALL') return true;
    return s.sensor === filter;
  });

  return (
    <div className="rounded-xl bg-[#111827] border border-slate-800 p-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span>Satellite Scene Repository</span>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-[11px]">
          {(['ALL', 'SAR', 'EO'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-2 py-0.5 rounded font-semibold transition ${
                filter === mode ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
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
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-xs font-mono font-bold text-slate-200">{scene.id}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold uppercase ${
                  scene.sensor === 'SAR' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                }`}>
                  {scene.satellite} {scene.sensor}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                <div>{scene.region}</div>
                <div className="font-mono text-[10px] text-slate-500">{formatDate(scene.acquisitionDate)}</div>
              </div>
              {isSelected && (
                <div className="mt-1.5 flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
                  <Check className="w-3 h-3" /> Active Scene
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Simulate Upload Action */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
        <span className="text-slate-400">Custom GeoTIFF / Level-1 GRD product:</span>
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
