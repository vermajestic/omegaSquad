import { apiClient } from './api';
import { mockIncidents } from '@/data/mockIncidents';

export async function runSpillDetection(sceneId: string): Promise<any> {
  try {
    return await apiClient<any>(`/detection/run`, {
      method: 'POST',
      body: JSON.stringify({ sceneId })
    });
  } catch {
    return { id: `det-new-${Date.now()}`, confidence: 0.9, sceneId };
  }
}

export async function getDetection(id: string): Promise<any | null> {
  try {
    return await apiClient<any>(`/detection/${id}`);
  } catch {
    const inc = mockIncidents.find(inc => inc.detection?.id === id);
    return inc ? inc.detection : null;
  }
}
