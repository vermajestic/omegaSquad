export type IncidentStatus = 'new' | 'under_investigation' | 'vessel_identified' | 'resolved' | 'false_positive';

export interface SpillDetection {
  id: string;
  confidence: number; // 0-100
  coordinates: { lat: number; lng: number };
  estimatedArea: number; // km²
  detectionTime: string; // ISO timestamp
  satellite: string;
  sensor: 'SAR' | 'EO';
  maskUrl?: string;
  originalImageUrl?: string;
  analysisIndicators: AnalysisIndicator[];
}

export interface AnalysisIndicator {
  name: string;
  level?: 'high' | 'medium' | 'low';
  severity?: 'high' | 'medium' | 'low' | string;
  score?: number;
  description?: string;
}

export interface Incident {
  id: string;
  status: IncidentStatus;
  detection?: SpillDetection;
  candidateVesselId?: string;
  attributionScore?: number;
  coordinates?: { lat: number; lng: number };
  confidence?: number;
  area?: number;
  estimatedArea?: number;
  satellite?: string;
  sensor?: 'SAR' | 'EO' | string;
  detectionTime?: string;
  createdAt?: string;
  updatedAt?: string;
  timeline?: TimelineEvent[];
  analysisIndicators?: AnalysisIndicator[];
  region: string;
}

export interface TimelineEvent {
  id?: string;
  timestamp: string;
  title?: string;
  description: string;
  type?: 'detection' | 'analysis' | 'ais' | 'attribution' | 'report';
  eventType?: string;
}
