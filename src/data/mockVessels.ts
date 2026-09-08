import type { VesselCandidate, VesselTrack } from '@/types';

export const mockVesselCandidates: VesselCandidate[] = [
  {
    id: 'v-001',
    name: 'MV Ocean Star',
    imo: '9123456',
    type: 'Tanker',
    distanceKm: 8.4,
    timeOffset: '+02:14',
    trackMatchScore: 94,
    speedPatternScore: 'high',
    attributionScore: 87,
    priority: 'high'
  },
  {
    id: 'v-002',
    name: 'MT Horizon',
    imo: '9234567',
    type: 'Cargo',
    distanceKm: 17.2,
    timeOffset: '-01:48',
    trackMatchScore: 81,
    speedPatternScore: 'medium',
    attributionScore: 68,
    priority: 'review'
  },
  {
    id: 'v-003',
    name: 'MV Eastern Pearl',
    imo: '9345678',
    type: 'Container',
    distanceKm: 32.6,
    timeOffset: '+04:12',
    trackMatchScore: 63,
    speedPatternScore: 'low',
    attributionScore: 41,
    priority: 'low'
  },
  {
    id: 'v-004',
    name: 'FV Coastal Dawn',
    imo: '9456789',
    type: 'Fishing',
    distanceKm: 45.1,
    timeOffset: '-03:22',
    trackMatchScore: 44,
    speedPatternScore: 'low',
    attributionScore: 29,
    priority: 'low'
  },
  {
    id: 'v-005',
    name: 'MT Blue Marlin',
    imo: '9567890',
    type: 'Tanker',
    distanceKm: 51.8,
    timeOffset: '+06:45',
    trackMatchScore: 38,
    speedPatternScore: 'medium',
    attributionScore: 22,
    priority: 'low'
  },
  { id: 'v-006', name: 'Albatross', imo: '9678901', type: 'Cargo', distanceKm: 60.2, timeOffset: '+08:10', trackMatchScore: 30, speedPatternScore: 'low', attributionScore: 18, priority: 'low' },
  { id: 'v-007', name: 'Sea Breeze', imo: '9789012', type: 'Container', distanceKm: 65.5, timeOffset: '-09:30', trackMatchScore: 25, speedPatternScore: 'low', attributionScore: 15, priority: 'low' },
  { id: 'v-008', name: 'Oceanic', imo: '9890123', type: 'Tanker', distanceKm: 72.1, timeOffset: '+10:45', trackMatchScore: 20, speedPatternScore: 'low', attributionScore: 12, priority: 'low' },
  { id: 'v-009', name: 'Voyager', imo: '9901234', type: 'Cargo', distanceKm: 80.4, timeOffset: '-11:20', trackMatchScore: 15, speedPatternScore: 'low', attributionScore: 10, priority: 'low' },
  { id: 'v-010', name: 'Polaris', imo: '9012345', type: 'Fishing', distanceKm: 85.6, timeOffset: '+12:05', trackMatchScore: 12, speedPatternScore: 'low', attributionScore: 8, priority: 'low' },
  { id: 'v-011', name: 'Aurora', imo: '9123457', type: 'Tanker', distanceKm: 92.3, timeOffset: '-14:15', trackMatchScore: 10, speedPatternScore: 'low', attributionScore: 5, priority: 'low' },
  { id: 'v-012', name: 'Sirius', imo: '9234568', type: 'Container', distanceKm: 98.7, timeOffset: '+15:40', trackMatchScore: 8, speedPatternScore: 'low', attributionScore: 3, priority: 'low' }
];

export const mockVesselTracks: Record<string, VesselTrack> = {
  'v-001': {
    vesselId: 'v-001',
    points: [
      { lat: 18.5350, lng: 67.6100, timestamp: '2026-09-04T12:00:00Z', speed: 14.2, heading: 45 },
      { lat: 18.5750, lng: 67.6500, timestamp: '2026-09-04T13:00:00Z', speed: 14.1, heading: 45 },
      { lat: 18.6150, lng: 67.6900, timestamp: '2026-09-04T14:00:00Z', speed: 14.0, heading: 46 },
      { lat: 18.6550, lng: 67.7300, timestamp: '2026-09-04T15:00:00Z', speed: 14.2, heading: 45 },
      { lat: 18.6950, lng: 67.7700, timestamp: '2026-09-04T16:00:00Z', speed: 13.8, heading: 44 },
      { lat: 18.7350, lng: 67.8100, timestamp: '2026-09-04T16:28:00Z', speed: 13.5, heading: 45 }, // Closest
      { lat: 18.7750, lng: 67.8500, timestamp: '2026-09-04T17:00:00Z', speed: 14.1, heading: 46 },
      { lat: 18.8150, lng: 67.8900, timestamp: '2026-09-04T18:00:00Z', speed: 14.3, heading: 45 },
      { lat: 18.8550, lng: 67.9300, timestamp: '2026-09-04T19:00:00Z', speed: 14.2, heading: 45 },
      { lat: 18.8950, lng: 67.9700, timestamp: '2026-09-04T20:00:00Z', speed: 14.0, heading: 44 },
      { lat: 18.9350, lng: 68.0100, timestamp: '2026-09-04T21:00:00Z', speed: 14.1, heading: 45 },
      { lat: 18.9750, lng: 68.0500, timestamp: '2026-09-04T22:00:00Z', speed: 14.2, heading: 45 },
      { lat: 19.0150, lng: 68.0900, timestamp: '2026-09-04T23:00:00Z', speed: 14.1, heading: 45 },
      { lat: 19.0550, lng: 68.1300, timestamp: '2026-09-05T00:00:00Z', speed: 14.0, heading: 46 },
      { lat: 19.0950, lng: 68.1700, timestamp: '2026-09-05T01:00:00Z', speed: 14.2, heading: 45 }
    ],
    closestApproach: {
      distanceKm: 2.1,
      point: { lat: 18.7350, lng: 67.8100 },
      timestamp: '2026-09-04T16:28:00Z'
    }
  },
  'v-002': {
    vesselId: 'v-002',
    points: [
      { lat: 18.9000, lng: 67.6000, timestamp: '2026-09-04T14:00:00Z', speed: 12.5, heading: 110 },
      { lat: 18.8700, lng: 67.6500, timestamp: '2026-09-04T15:00:00Z', speed: 12.4, heading: 110 },
      { lat: 18.8400, lng: 67.7000, timestamp: '2026-09-04T16:00:00Z', speed: 12.6, heading: 111 },
      { lat: 18.8100, lng: 67.7500, timestamp: '2026-09-04T16:54:00Z', speed: 12.5, heading: 110 }, // Closest
      { lat: 18.7800, lng: 67.8000, timestamp: '2026-09-04T18:00:00Z', speed: 12.3, heading: 109 },
      { lat: 18.7500, lng: 67.8500, timestamp: '2026-09-04T19:00:00Z', speed: 12.5, heading: 110 },
      { lat: 18.7200, lng: 67.9000, timestamp: '2026-09-04T20:00:00Z', speed: 12.6, heading: 110 },
      { lat: 18.6900, lng: 67.9500, timestamp: '2026-09-04T21:00:00Z', speed: 12.4, heading: 111 },
      { lat: 18.6600, lng: 68.0000, timestamp: '2026-09-04T22:00:00Z', speed: 12.5, heading: 110 },
      { lat: 18.6300, lng: 68.0500, timestamp: '2026-09-04T23:00:00Z', speed: 12.5, heading: 110 },
      { lat: 18.6000, lng: 68.1000, timestamp: '2026-09-05T00:00:00Z', speed: 12.4, heading: 109 },
      { lat: 18.5700, lng: 68.1500, timestamp: '2026-09-05T01:00:00Z', speed: 12.5, heading: 110 },
      { lat: 18.5400, lng: 68.2000, timestamp: '2026-09-05T02:00:00Z', speed: 12.6, heading: 110 },
      { lat: 18.5100, lng: 68.2500, timestamp: '2026-09-05T03:00:00Z', speed: 12.5, heading: 111 },
      { lat: 18.4800, lng: 68.3000, timestamp: '2026-09-05T04:00:00Z', speed: 12.5, heading: 110 }
    ],
    closestApproach: {
      distanceKm: 17.2,
      point: { lat: 18.8100, lng: 67.7500 },
      timestamp: '2026-09-04T16:54:00Z'
    }
  },
  'v-003': {
    vesselId: 'v-003',
    points: [
      { lat: 18.3000, lng: 68.1000, timestamp: '2026-09-04T18:00:00Z', speed: 18.5, heading: 330 },
      { lat: 18.3500, lng: 68.0500, timestamp: '2026-09-04T19:00:00Z', speed: 18.4, heading: 330 },
      { lat: 18.4000, lng: 68.0000, timestamp: '2026-09-04T20:00:00Z', speed: 18.6, heading: 331 },
      { lat: 18.4500, lng: 67.9500, timestamp: '2026-09-04T21:00:00Z', speed: 18.5, heading: 330 },
      { lat: 18.5000, lng: 67.9000, timestamp: '2026-09-04T22:00:00Z', speed: 18.3, heading: 329 },
      { lat: 18.5500, lng: 67.8500, timestamp: '2026-09-04T22:54:00Z', speed: 18.5, heading: 330 }, // Closest
      { lat: 18.6000, lng: 67.8000, timestamp: '2026-09-05T00:00:00Z', speed: 18.6, heading: 330 },
      { lat: 18.6500, lng: 67.7500, timestamp: '2026-09-05T01:00:00Z', speed: 18.4, heading: 331 },
      { lat: 18.7000, lng: 67.7000, timestamp: '2026-09-05T02:00:00Z', speed: 18.5, heading: 330 },
      { lat: 18.7500, lng: 67.6500, timestamp: '2026-09-05T03:00:00Z', speed: 18.5, heading: 330 },
      { lat: 18.8000, lng: 67.6000, timestamp: '2026-09-05T04:00:00Z', speed: 18.4, heading: 329 },
      { lat: 18.8500, lng: 67.5500, timestamp: '2026-09-05T05:00:00Z', speed: 18.5, heading: 330 },
      { lat: 18.9000, lng: 67.5000, timestamp: '2026-09-05T06:00:00Z', speed: 18.6, heading: 330 },
      { lat: 18.9500, lng: 67.4500, timestamp: '2026-09-05T07:00:00Z', speed: 18.5, heading: 331 },
      { lat: 19.0000, lng: 67.4000, timestamp: '2026-09-05T08:00:00Z', speed: 18.5, heading: 330 }
    ],
    closestApproach: {
      distanceKm: 32.6,
      point: { lat: 18.5500, lng: 67.8500 },
      timestamp: '2026-09-04T22:54:00Z'
    }
  }
};

export const mockVessels = mockVesselCandidates;
