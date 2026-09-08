export type VesselType = 'tanker' | 'cargo' | 'container' | 'fishing' | 'passenger' | 'other';
export type VesselPriority = 'high' | 'review' | 'low';

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  type: VesselType;
  flag: string;
  callsign: string;
  mmsi: string;
  length: number;
  beam: number;
}

export interface VesselCandidate {
  id?: string;
  rank?: number;
  vessel?: Vessel;
  name?: string;
  imo?: string;
  type?: string | VesselType;
  distance?: number; // km from spill
  distanceKm?: number;
  timeDifference?: string; // e.g. '+02:14'
  timeOffset?: string;
  trackMatch?: number; // 0-100
  trackMatchScore?: number;
  speedPattern?: 'high' | 'medium' | 'low';
  speedPatternScore?: 'high' | 'medium' | 'low';
  attributionScore?: number; // 0-100
  priority?: VesselPriority;
}

export interface VesselTrackPoint {
  lat: number;
  lng: number;
  timestamp: string;
  speed: number; // knots
  heading: number; // degrees
}

export interface VesselTrack {
  vesselId: string;
  points: VesselTrackPoint[];
  closestApproach: {
    distance?: number;
    distanceKm?: number;
    point: { lat: number; lng: number };
    timestamp: string;
  };
}
