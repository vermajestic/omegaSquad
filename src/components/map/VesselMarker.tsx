import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { VesselCandidate } from '@/types';
import { formatDistance, formatConfidence } from '@/utils';

interface VesselMarkerProps {
  vessel: VesselCandidate;
  position: { lat: number; lng: number };
  heading?: number;
  rank?: number;
  isSelected?: boolean;
  onSelect?: (vessel: VesselCandidate) => void;
}

export const VesselMarker: React.FC<VesselMarkerProps> = ({
  vessel,
  position,
  heading = 45,
  rank = 1,
  isSelected = false,
  onSelect,
}) => {
  const isTopCandidate = rank === 1 || vessel.priority === 'high';
  const markerColor = isTopCandidate ? '#06b6d4' : '#60a5fa'; // cyan or blue

  const customIcon = L.divIcon({
    className: 'vessel-custom-marker',
    html: `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <div style="
          width: 24px;
          height: 24px;
          background-color: ${isSelected ? '#06b6d4' : '#1e293b'};
          border: 2px solid ${markerColor};
          box-shadow: 0 0 ${isSelected ? '10px' : '4px'} ${markerColor};
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(${heading}deg);
          transition: transform 0.3s ease;
        ">
          <!-- Ship arrowhead -->
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#0a0f1e' : markerColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="${isSelected ? '#0a0f1e' : markerColor}" />
          </svg>
        </div>
        ${rank <= 3 ? `
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: ${rank === 1 ? '#06b6d4' : '#3b82f6'};
            color: #0a0f1e;
            font-size: 9px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #0a0f1e;
          ">
            ${rank}
          </div>
        ` : ''}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          if (onSelect) onSelect(vessel);
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
        <div className="bg-[#111827] text-slate-100 p-2.5 rounded border border-slate-700 shadow-xl text-xs min-w-[180px]">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold tracking-wide text-cyan-300">
              #{rank} {vessel.name}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${
              isTopCandidate ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-800 text-slate-300'
            }`}>
              {vessel.type}
            </span>
          </div>
          <div className="space-y-0.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">IMO:</span>
              <span className="font-mono">{vessel.imo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Spill Proximity:</span>
              <span className="font-mono text-amber-400">{formatDistance(vessel.distanceKm)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Attribution Match:</span>
              <span className="font-mono font-medium text-cyan-400">{formatConfidence(vessel.attributionScore)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Track Match:</span>
              <span className="font-mono">{vessel.trackMatchScore}%</span>
            </div>
          </div>
          <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-cyan-300 text-center font-medium">
            Click to view trajectory & attribution
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
};
