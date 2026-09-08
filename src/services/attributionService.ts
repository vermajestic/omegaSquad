import { apiClient } from './api';
import { mockAttributionResult } from '@/data/mockAttribution';

export async function analyzeAttribution(incidentId: string, vesselId: string): Promise<any> {
  try {
    return await apiClient<any>(`/attribution`, {
      method: 'POST',
      body: JSON.stringify({ incidentId, vesselId })
    });
  } catch {
    return mockAttributionResult;
  }
}
