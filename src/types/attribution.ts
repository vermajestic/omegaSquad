export interface AttributionEvidence {
  id?: string;
  category?: string;
  label?: string;
  name?: string;
  score: number; // 0-100
  description: string;
  weight: number; // 0-1 (fraction of total)
}

export interface AttributionResult {
  incidentId: string;
  vesselId: string;
  vesselName: string;
  overallScore: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
  evidence: AttributionEvidence[];
  timestamp?: string;
  disclaimer: string;
}
