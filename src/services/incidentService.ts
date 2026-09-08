import { apiClient } from './api';
import { mockIncidents } from '@/data/mockIncidents';

export async function getIncidents(): Promise<any[]> {
  try {
    return await apiClient<any[]>('/incidents');
  } catch {
    return mockIncidents;
  }
}

export async function getIncident(id: string): Promise<any | null> {
  try {
    return await apiClient<any>(`/incidents/${id}`);
  } catch {
    return mockIncidents.find(inc => inc.id === id) || null;
  }
}
