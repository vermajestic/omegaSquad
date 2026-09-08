import { config } from '@/config';

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (config.isDemoMode) {
    await new Promise(r => setTimeout(r, 300 + Math.random() * 500));
    throw new Error('DEMO_MODE');
  }
  const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}
