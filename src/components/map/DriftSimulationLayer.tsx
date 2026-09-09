import React from 'react';
import { Polyline, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Incident } from '@/types';

interface DriftSimulationLayerProps {
  incident: Incident;
}

export const DriftSimulationLayer: React.FC<DriftSimulationLayerProps> = ({ incident }) => {
  if (!incident.coordinates) return null;

  // Detection point (center of slick)
  const detectionPoint: [number, number] = [incident.coordinates.lat, incident.coordinates.lng];

  // Hardcoded for demo based on problem statement: PCA of MV Ocean Star is 18.7562, 67.8091
  // We'll use this as origin
  const originPoint: [number, number] = [18.7562, 67.8091];

  // Forward Forecast Points
  const forecast12h: [number, number] = [18.555, 67.955];
  const forecast24h: [number, number] = [18.370, 68.088];
  const forecast48h: [number, number] = [18.000, 68.355]; // Approaching boundary

  // Hindcast path
  const hindcastPath = [originPoint, detectionPoint];

  // Forecast path and cone
  const forecastPath = [detectionPoint, forecast12h, forecast24h, forecast48h];
  
  // Create a cone (polygon) representing dispersal uncertainty
  const forecastCone: [number, number][] = [
    detectionPoint,
    [17.95, 68.25], // left bound at 48h
    [18.05, 68.45], // right bound at 48h
  ];

  // Custom marker for origin point
  const originIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="relative flex items-center justify-center w-6 h-6">
        <div class="absolute w-4 h-4 bg-amber-500 rounded-full animate-ping opacity-75"></div>
        <div class="absolute w-2 h-2 bg-amber-500 rounded-full border border-white"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <>
      {/* ⏪ Backward Hindcast Path (Dashed Amber) */}
      <Polyline
        positions={hindcastPath}
        color="#f59e0b" // amber-500
        dashArray="8, 8"
        weight={3}
        opacity={0.8}
      >
        <Popup>
          <div className="text-sm">
            <strong>Backward Hindcast Path</strong><br />
            Traces back to Estimated Origin Release Point (t0)
          </div>
        </Popup>
      </Polyline>

      {/* Origin Point Marker */}
      <Marker position={originPoint} icon={originIcon}>
        <Popup>
          <div className="text-sm">
            <strong className="text-amber-600 dark:text-amber-400">Estimated Origin (t0)</strong><br />
            Lat: {originPoint[0]}<br />
            Lng: {originPoint[1]}<br />
            Intersected Vessel Track: MV Ocean Star
          </div>
        </Popup>
      </Marker>

      {/* ⏩ Forward Forecast Cone (Semi-transparent Red/Cyan) */}
      <Polygon
        positions={forecastCone}
        pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 1, dashArray: '4,4' }}
      />
      
      {/* Forward Forecast Path */}
      <Polyline
        positions={forecastPath}
        color="#ef4444" // red-500 for coastal threat
        weight={2}
        opacity={0.9}
        dashArray="5, 10"
      >
        <Popup>
          <div className="text-sm">
            <strong>Forward Forecast Drift</strong><br />
            Projected trajectory (+12h, +24h, +48h)<br />
            Rate: 1.2 kts @ 142° SE
          </div>
        </Popup>
      </Polyline>

      {/* Forecast Markers (+12h, +24h, +48h) */}
      {[
        { pos: forecast12h, label: '+12h' },
        { pos: forecast24h, label: '+24h' },
        { pos: forecast48h, label: '+48h (Coastal Threat)' }
      ].map((pt, idx) => (
        <Marker
          key={`forecast-${idx}`}
          position={pt.pos}
          icon={L.divIcon({
            className: 'bg-transparent',
            html: `<div class="bg-red-500/90 text-white text-[9px] px-1 py-0.5 rounded-sm whitespace-nowrap border border-red-400 font-bold tracking-wider">${pt.label}</div>`,
            iconSize: [40, 16],
            iconAnchor: [20, 8]
          })}
        />
      ))}
    </>
  );
};
