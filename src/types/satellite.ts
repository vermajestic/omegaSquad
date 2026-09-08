export type SatelliteSource = 'Sentinel-1' | 'Sentinel-2' | 'RADARSAT' | 'TerraSAR-X';
export type SensorType = 'SAR' | 'EO';
export type ProcessingStatus = 'raw' | 'preprocessed' | 'analyzed' | 'completed';

export interface SatelliteScene {
  id: string;
  satellite: SatelliteSource;
  sensor: SensorType;
  acquisitionDate: string; // ISO timestamp
  region: string;
  coverage?: number; // km²
  coverageArea?: number; // km² alias
  cloudCoverage?: number; // percentage, only for EO
  processingStatus: ProcessingStatus;
  resolution: string;
  coordinates: { lat: number; lng: number };
  thumbnailUrl?: string;
}
