import type { AttributionResult } from '@/types';

export const mockAttributionResult: AttributionResult = {
  incidentId: 'OS-2026-DEMO-041',
  vesselId: 'v-001',
  vesselName: 'MV Ocean Star',
  overallScore: 87,
  confidence: 'high',
  evidence: [
    {
      id: 'e1',
      name: 'Spatial Proximity',
      score: 94,
      weight: 0.30,
      description: 'Vessel passed within 2.1 km of the estimated spill center. Track intersects the detection zone boundary.'
    },
    {
      id: 'e2',
      name: 'Temporal Correlation',
      score: 88,
      weight: 0.25,
      description: 'Vessel transit through the area occurred 2 hours 14 minutes before the satellite detection time, consistent with estimated spill age.'
    },
    {
      id: 'e3',
      name: 'Trajectory Consistency',
      score: 91,
      weight: 0.25,
      description: 'Vessel heading and track direction are consistent with the elongation axis of the detected spill. Movement pattern matches expected drift direction.'
    },
    {
      id: 'e4',
      name: 'AIS Continuity',
      score: 96,
      weight: 0.20,
      description: 'Continuous AIS transmission recorded throughout the relevant time window. No signal gaps or anomalous position jumps detected.'
    }
  ],
  disclaimer: 'AI-assisted analytical assessment. Results are intended to support investigation and decision-making and do not constitute legal proof of responsibility.'
};

export const secondaryAttributionResult: AttributionResult = {
  incidentId: 'OS-2026-DEMO-041',
  vesselId: 'v-002',
  vesselName: 'MT Horizon',
  overallScore: 68,
  confidence: 'medium',
  evidence: [
    {
      id: 'e1_2',
      name: 'Spatial Proximity',
      score: 72,
      weight: 0.30,
      description: 'Vessel passed approximately 17.2 km from the spill center.'
    },
    {
      id: 'e2_2',
      name: 'Temporal Correlation',
      score: 65,
      weight: 0.25,
      description: 'Transit occurred 1 hour 48 minutes after the detection time.'
    },
    {
      id: 'e3_2',
      name: 'Trajectory Consistency',
      score: 60,
      weight: 0.25,
      description: 'Track direction differs slightly from main drift pattern.'
    },
    {
      id: 'e4_2',
      name: 'AIS Continuity',
      score: 80,
      weight: 0.20,
      description: 'Mostly continuous AIS transmission, minor gaps.'
    }
  ],
  disclaimer: 'AI-assisted analytical assessment. Results are intended to support investigation and decision-making and do not constitute legal proof of responsibility.'
};
