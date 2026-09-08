import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { Incident } from '@/types';
import { formatCoordinates, formatArea, formatConfidence } from '@/utils';

interface SpillMarkerProps {
  incident: Incident;
  isSelected?: boolean;
  onSelect?: (incident: Incident) => void;
}

export const SpillMarker: React.FC<SpillMarkerProps> = ({
  incident,
  isSelected = false,
  onSelect,
}) => {
  const coords = incident.coordinates || { lat: 18.7421, lng: 67.8214 };
  const conf = incident.confidence ?? 85;
  const area = incident.estimatedArea ?? incident.area ?? 10;

  // Determine color theme based on confidence & status
  let borderColor = '#ef4444';
  let pulseColor = 'rgba(239, 68, 68, 0.4)';

  if (incident.status === 'false_positive' || conf < 50) {
    borderColor = '#94a3b8';
    pulseColor = 'rgba(148, 163, 184, 0.2)';
  } else if (conf < 80) {
    borderColor = '#f59e0b';
    pulseColor = 'rgba(245, 158, 11, 0.4)';
  }

  const customIcon = L.divIcon({
    className: 'spill-custom-marker',
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${pulseColor};
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
        <div style="
          width: ${isSelected ? '22px' : '16px'};
          height: ${isSelected ? '22px' : '16px'};
          border-radius: 50%;
          background-color: ${borderColor};
          border: 2px solid ${isSelected ? '#ffffff' : '#0a0f1e'};
          box-shadow: 0 0 ${isSelected ? '12px' : '6px'} ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        ">
          <div style="width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  return (
    <Marker
      position={[coords.lat, coords.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          if (onSelect) onSelect(incident);
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
        <div className="bg-[#111827] text-slate-100 p-2.5 rounded border border-slate-700 shadow-xl text-xs min-w-[170px]">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold tracking-wide text-cyan-400">{incident.id}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 font-semibold uppercase">
              {incident.status.replace('_', ' ')}
            </span>
          </div>
          <div className="space-y-0.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Confidence:</span>
              <span className="font-mono font-medium text-emerald-400">{formatConfidence(conf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Area:</span>
              <span className="font-mono">{formatArea(area)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Satellite:</span>
              <span>{incident.satellite || 'Sentinel-1'} ({incident.sensor || 'SAR'})</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span>Coords:</span>
              <span className="font-mono">{formatCoordinates(coords.lat, coords.lng)}</span>
            </div>
          </div>
          <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-cyan-300 text-center font-medium">
            Click marker to inspect incident
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
};
