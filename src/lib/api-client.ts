import { env } from '@/env';

export async function apiClient<T>(
  endpoint: string,
  {
    method = 'GET',
    body,
    token,
    ...customConfig
  }: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    token?: string;
    [key: string]: unknown;
  } = {},
): Promise<T | null> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    ...customConfig,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const baseUrl = env.VITE_API_URL.endsWith('/') ? env.VITE_API_URL.slice(0, -1) : env.VITE_API_URL;

  const fullUrl = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;

  const response = await fetch(fullUrl, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text);
}
