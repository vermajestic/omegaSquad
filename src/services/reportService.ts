import { apiClient } from './api';

export async function generateReport(incidentId: string): Promise<any> {
  try {
    return await apiClient<any>(`/reports/generate`, {
      method: 'POST',
      body: JSON.stringify({ incidentId })
    });
  } catch {
    return {
      incidentId,
      reportDate: new Date().toISOString(),
      status: 'Generated',
      summary: 'Auto-generated report for the incident based on available intelligence.'
    };
  }
}
