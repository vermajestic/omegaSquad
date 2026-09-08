import React from 'react';
import { Polygon, Tooltip } from 'react-leaflet';
import type { Incident } from '@/types';
import { formatArea } from '@/utils';

interface DetectionZoneProps {
  incident: Incident;
  color?: string;
}

export const DetectionZone: React.FC<DetectionZoneProps> = ({
  incident,
  color = '#ef4444',
}) => {
  const coords = incident.coordinates || { lat: 18.7421, lng: 67.8214 };
  const area = incident.estimatedArea ?? incident.area ?? 12.4;

  // Approximate an irregular polygonal oil slick boundary around center coordinates
  // based on area size (12.4 km^2 ~ 0.03 deg spread with wind elongation)
  const spread = Math.sqrt(area) * 0.008;
  const polygonPoints: [number, number][] = [
    [coords.lat - spread * 0.4, coords.lng - spread * 1.5],
    [coords.lat + spread * 0.6, coords.lng - spread * 0.8],
    [coords.lat + spread * 1.2, coords.lng + spread * 0.2],
    [coords.lat + spread * 0.9, coords.lng + spread * 1.4],
    [coords.lat + spread * 0.2, coords.lng + spread * 1.6],
    [coords.lat - spread * 0.8, coords.lng + spread * 0.9],
    [coords.lat - spread * 1.1, coords.lng - spread * 0.3],
  ];

  return (
    <Polygon
      positions={polygonPoints}
      pathOptions={{
        color,
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: color,
        fillOpacity: 0.18,
      }}
    >
      <Tooltip sticky opacity={0.9}>
        <div className="bg-[#111827] text-slate-200 text-xs px-2 py-1 rounded border border-slate-700">
          <span className="font-semibold text-red-400">SAR Slick Footprint</span>: {formatArea(area)}
        </div>
      </Tooltip>
    </Polygon>
  );
};
