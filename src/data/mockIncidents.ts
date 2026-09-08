import type { Incident } from '@/types';

export const mockIncidents: Incident[] = [
  {
    id: 'OS-2026-DEMO-041',
    status: 'under_investigation',
    coordinates: { lat: 18.7421, lng: 67.8214 },
    confidence: 94.2,
    estimatedArea: 12.4,
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    detectionTime: '2026-09-04T18:42:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 96, severity: 'high' },
      { name: 'shape_consistency', score: 92, severity: 'high' },
      { name: 'texture_match', score: 88, severity: 'medium' },
      { name: 'environmental_context', score: 95, severity: 'high' },
      { name: 'temporal_persistence', score: 85, severity: 'medium' }
    ],
    timeline: [
      { id: 't1', timestamp: '2026-09-04T18:38:00Z', eventType: 'scene_acquired', description: 'Sentinel-1 SAR scene acquired over Arabian Sea.' },
      { id: 't2', timestamp: '2026-09-04T18:42:00Z', eventType: 'anomaly_detected', description: 'AI detected dark surface anomaly consistent with oil spill.' },
      { id: 't3', timestamp: '2026-09-04T18:45:00Z', eventType: 'incident_created', description: 'Incident OS-2026-DEMO-041 created automatically.' },
      { id: 't4', timestamp: '2026-09-04T18:50:00Z', eventType: 'ais_correlation_started', description: 'AIS data correlation initiated for 72-hour window.' },
      { id: 't5', timestamp: '2026-09-04T19:15:00Z', eventType: 'vessels_identified', description: '12 potential vessel candidates identified in vicinity.' },
      { id: 't6', timestamp: '2026-09-04T20:30:00Z', eventType: 'attribution_analysis_complete', description: 'Attribution analysis prioritized MV Ocean Star.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-040',
    status: 'vessel_identified',
    coordinates: { lat: 15.2314, lng: 70.1142 },
    confidence: 88.5,
    estimatedArea: 8.2,
    satellite: 'Sentinel-2',
    sensor: 'EO',
    detectionTime: '2026-09-02T10:15:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 85, severity: 'medium' },
      { name: 'shape_consistency', score: 90, severity: 'high' },
      { name: 'texture_match', score: 78, severity: 'medium' },
      { name: 'environmental_context', score: 88, severity: 'high' }
    ],
    timeline: [
      { id: 't1_040', timestamp: '2026-09-02T10:15:00Z', eventType: 'anomaly_detected', description: 'Detection confirmed.' },
      { id: 't2_040', timestamp: '2026-09-02T12:00:00Z', eventType: 'vessels_identified', description: 'Vessel matched.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-039',
    status: 'resolved',
    coordinates: { lat: 19.5521, lng: 72.3411 },
    confidence: 96.1,
    estimatedArea: 28.5,
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    detectionTime: '2026-08-28T05:30:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 98, severity: 'high' },
      { name: 'shape_consistency', score: 95, severity: 'high' },
      { name: 'texture_match', score: 97, severity: 'high' },
      { name: 'environmental_context', score: 92, severity: 'high' },
      { name: 'temporal_persistence', score: 94, severity: 'high' }
    ],
    timeline: [
      { id: 't1_039', timestamp: '2026-08-28T05:30:00Z', eventType: 'anomaly_detected', description: 'Large spill detected.' },
      { id: 't2_039', timestamp: '2026-08-30T14:00:00Z', eventType: 'resolved', description: 'Fines issued to responsible vessel.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-038',
    status: 'false_positive',
    coordinates: { lat: 12.8421, lng: 75.1234 },
    confidence: 34.2,
    estimatedArea: 2.1,
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    detectionTime: '2026-08-25T17:22:00Z',
    region: 'Laccadive Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 45, severity: 'low' },
      { name: 'shape_consistency', score: 30, severity: 'low' },
      { name: 'texture_match', score: 25, severity: 'low' },
      { name: 'environmental_context', score: 40, severity: 'low' }
    ],
    timeline: [
      { id: 't1_038', timestamp: '2026-08-25T17:22:00Z', eventType: 'anomaly_detected', description: 'Low confidence detection.' },
      { id: 't2_038', timestamp: '2026-08-25T18:00:00Z', eventType: 'false_positive', description: 'Dismissed as natural biogenic slick.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-037',
    status: 'new',
    coordinates: { lat: 21.1421, lng: 69.8214 },
    confidence: 72.4,
    estimatedArea: 5.6,
    satellite: 'Sentinel-2',
    sensor: 'EO',
    detectionTime: '2026-09-05T00:12:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 75, severity: 'medium' },
      { name: 'shape_consistency', score: 70, severity: 'medium' },
      { name: 'texture_match', score: 68, severity: 'medium' },
      { name: 'environmental_context', score: 80, severity: 'high' }
    ],
    timeline: [
      { id: 't1_037', timestamp: '2026-09-05T00:12:00Z', eventType: 'anomaly_detected', description: 'New incident logged for review.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-036',
    status: 'under_investigation',
    coordinates: { lat: 17.5421, lng: 71.2214 },
    confidence: 65.8,
    estimatedArea: 4.3,
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    detectionTime: '2026-09-01T22:45:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 68, severity: 'medium' },
      { name: 'shape_consistency', score: 62, severity: 'medium' },
      { name: 'texture_match', score: 55, severity: 'low' },
      { name: 'environmental_context', score: 70, severity: 'medium' }
    ],
    timeline: [
      { id: 't1_036', timestamp: '2026-09-01T22:45:00Z', eventType: 'anomaly_detected', description: 'Detection logged.' },
      { id: 't2_036', timestamp: '2026-09-02T08:00:00Z', eventType: 'ais_correlation_started', description: 'Reviewing AIS history.' }
    ]
  },
  {
    id: 'OS-2026-DEMO-035',
    status: 'vessel_identified',
    coordinates: { lat: 14.1421, lng: 73.8214 },
    confidence: 82.1,
    estimatedArea: 9.7,
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    detectionTime: '2026-08-20T11:30:00Z',
    region: 'Arabian Sea',
    analysisIndicators: [
      { name: 'dark_surface_anomaly', score: 85, severity: 'medium' },
      { name: 'shape_consistency', score: 80, severity: 'medium' },
      { name: 'texture_match', score: 78, severity: 'medium' },
      { name: 'environmental_context', score: 88, severity: 'high' }
    ],
    timeline: [
      { id: 't1_035', timestamp: '2026-08-20T11:30:00Z', eventType: 'anomaly_detected', description: 'Detection logged.' },
      { id: 't2_035', timestamp: '2026-08-22T09:00:00Z', eventType: 'vessels_identified', description: 'Vessel identified.' }
    ]
  }
];
