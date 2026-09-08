import { apiClient } from './api';
import { mockSatelliteScenes } from '@/data/mockSatelliteScenes';

export async function getSatelliteScenes(filters?: { satellite?: string; sensor?: string; region?: string }): Promise<any[]> {
  try {
    const qs = new URLSearchParams(filters as any).toString();
    return await apiClient<any[]>(`/satellite/scenes?${qs}`);
  } catch {
    return mockSatelliteScenes;
  }
}
