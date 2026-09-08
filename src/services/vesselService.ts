import { apiClient } from './api';
import { mockVessels } from '@/data/mockVessels';

export async function getNearbyVessels(incidentId: string, radius?: number): Promise<any[]> {
  try {
    return await apiClient<any[]>(`/vessels/nearby?incidentId=${incidentId}&radius=${radius || 50}`);
  } catch {
    return mockVessels;
  }
}

export async function getVesselTrack(vesselId: string): Promise<any[]> {
  try {
    return await apiClient<any[]>(`/vessels/${vesselId}/track`);
  } catch {
    return [];
  }
}
