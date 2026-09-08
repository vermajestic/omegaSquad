import React from 'react';
import { Eye, EyeOff, Compass, Maximize2, Minimize2, Navigation } from 'lucide-react';

export interface MapLayerState {
  showSpills: boolean;
  showVessels: boolean;
  showTracks: boolean;
  showZones: boolean;
}

interface MapControlsProps {
  layers: MapLayerState;
  onToggleLayer: (key: keyof MapLayerState) => void;
  onRecenter: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  onRecenter,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      {/* Recenter / Focus Controls */}
      <div className="bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1.5 shadow-xl flex flex-col gap-1">
        <button
          onClick={onRecenter}
          className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded transition flex items-center justify-center group relative"
          title="Recenter Map on Arabian Sea"
        >
          <Compass className="w-4 h-4" />
          <span className="sr-only">Recenter Arabian Sea</span>
        </button>

        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded transition flex items-center justify-center"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Layer Visibility Toggles */}
      <div className="bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-xl flex flex-col gap-1 text-xs text-slate-300 min-w-[140px]">
        <div className="text-[10px] uppercase font-bold text-slate-400 px-1 pb-1 border-b border-slate-800 mb-1 flex items-center justify-between">
          <span>Map Layers</span>
          <Navigation className="w-3 h-3 text-cyan-400" />
        </div>

        <button
          onClick={() => onToggleLayer('showSpills')}
          className={`flex items-center justify-between px-2 py-1 rounded text-left transition ${
            layers.showSpills ? 'bg-red-950/40 text-red-300 font-medium' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Oil Spills</span>
          {layers.showSpills ? <Eye className="w-3.5 h-3.5 text-red-400" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onToggleLayer('showVessels')}
          className={`flex items-center justify-between px-2 py-1 rounded text-left transition ${
            layers.showVessels ? 'bg-blue-950/40 text-blue-300 font-medium' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>AIS Vessels</span>
          {layers.showVessels ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onToggleLayer('showTracks')}
          className={`flex items-center justify-between px-2 py-1 rounded text-left transition ${
            layers.showTracks ? 'bg-cyan-950/40 text-cyan-300 font-medium' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Vessel Tracks</span>
          {layers.showTracks ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onToggleLayer('showZones')}
          className={`flex items-center justify-between px-2 py-1 rounded text-left transition ${
            layers.showZones ? 'bg-slate-800/80 text-slate-200 font-medium' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>SAR Slick Zone</span>
          {layers.showZones ? <Eye className="w-3.5 h-3.5 text-slate-300" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
