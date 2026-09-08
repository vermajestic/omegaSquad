import React from 'react';
import { Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import type { VesselTrack } from '@/types';
import { formatDistance, formatTime } from '@/utils';

interface VesselTrackLineProps {
  track: VesselTrack;
  vesselName?: string;
  color?: string;
}

export const VesselTrackLine: React.FC<VesselTrackLineProps> = ({
  track,
  vesselName = 'Target Vessel',
  color = '#06b6d4',
}) => {
  if (!track || !track.points || track.points.length === 0) return null;

  const positions = track.points.map(p => [p.lat, p.lng] as [number, number]);
  const closest = track.closestApproach;

  return (
    <>
      {/* Historical Track Line */}
      <Polyline
        positions={positions}
        pathOptions={{
          color,
          weight: 3,
          opacity: 0.85,
          dashArray: '6, 6',
        }}
      />

      {/* Track waypoints (sample every few points to avoid clutter) */}
      {track.points.filter((_, idx) => idx % 3 === 0).map((pt, idx) => (
        <CircleMarker
          key={`wp-${idx}`}
          center={[pt.lat, pt.lng]}
          radius={3}
          pathOptions={{
            color,
            fillColor: '#0a0f1e',
            fillOpacity: 1,
            weight: 1.5,
          }}
        >
          <Tooltip direction="top" offset={[0, -5]} opacity={0.9}>
            <div className="bg-[#111827] text-[11px] text-slate-200 px-2 py-1 rounded border border-slate-700">
              <span className="font-mono">{formatTime(pt.timestamp)}</span> • {pt.speed} kts
            </div>
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Closest Approach Point Highlight */}
      {closest && (
        <CircleMarker
          center={[closest.point.lat, closest.point.lng]}
          radius={7}
          pathOptions={{
            color: '#f59e0b',
            fillColor: '#f59e0b',
            fillOpacity: 0.8,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} permanent opacity={0.95}>
            <div className="bg-[#111827] text-[11px] text-amber-300 font-semibold px-2 py-1 rounded border border-amber-600/60 shadow-lg whitespace-nowrap">
              {vesselName} Closest Approach: {formatDistance(closest.distanceKm)} ({formatTime(closest.timestamp)})
            </div>
          </Tooltip>
        </CircleMarker>
      )}
    </>
  );
};
