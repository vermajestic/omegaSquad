import type { SatelliteScene } from '@/types';

export const mockSatelliteScenes: SatelliteScene[] = [
  {
    id: 'scene-001',
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    acquisitionDate: '2026-09-04T18:38:00Z',
    region: 'Arabian Sea',
    coordinates: { lat: 18.7421, lng: 67.8214 },
    processingStatus: 'completed',
    resolution: '10m',
    coverageArea: 15000
  },
  {
    id: 'scene-002',
    satellite: 'Sentinel-2',
    sensor: 'EO',
    acquisitionDate: '2026-09-05T10:15:00Z',
    region: 'Arabian Sea',
    coordinates: { lat: 21.1421, lng: 69.8214 },
    processingStatus: 'preprocessed',
    resolution: '10m',
    coverageArea: 8000
  },
  {
    id: 'scene-003',
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    acquisitionDate: '2026-09-02T10:15:00Z',
    region: 'Bay of Bengal',
    coordinates: { lat: 15.2314, lng: 88.1142 },
    processingStatus: 'completed',
    resolution: '20m',
    coverageArea: 25000
  },
  {
    id: 'scene-004',
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    acquisitionDate: '2026-08-28T05:30:00Z',
    region: 'Arabian Sea',
    coordinates: { lat: 19.5521, lng: 72.3411 },
    processingStatus: 'analyzed',
    resolution: '10m',
    coverageArea: 12000
  },
  {
    id: 'scene-005',
    satellite: 'Sentinel-2',
    sensor: 'EO',
    acquisitionDate: '2026-08-25T17:22:00Z',
    region: 'Laccadive Sea',
    coordinates: { lat: 12.8421, lng: 75.1234 },
    processingStatus: 'completed',
    resolution: '5m',
    coverageArea: 5000
  },
  {
    id: 'scene-006',
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    acquisitionDate: '2026-09-01T22:45:00Z',
    region: 'Arabian Sea',
    coordinates: { lat: 17.5421, lng: 71.2214 },
    processingStatus: 'completed',
    resolution: '10m',
    coverageArea: 18000
  },
  {
    id: 'scene-007',
    satellite: 'Sentinel-2',
    sensor: 'EO',
    acquisitionDate: '2026-08-20T11:30:00Z',
    region: 'Indian Ocean',
    coordinates: { lat: 5.1421, lng: 78.8214 },
    processingStatus: 'analyzed',
    resolution: '20m',
    coverageArea: 50000
  },
  {
    id: 'scene-008',
    satellite: 'Sentinel-1',
    sensor: 'SAR',
    acquisitionDate: '2026-09-06T08:00:00Z',
    region: 'Andaman Sea',
    coordinates: { lat: 10.1421, lng: 95.8214 },
    processingStatus: 'raw',
    resolution: '10m',
    coverageArea: 20000
  }
];
