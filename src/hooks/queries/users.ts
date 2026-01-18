import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

export interface SyncUserPayload {
  clerk_id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
}

export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  list: () => [...userKeys.all, 'list'] as const,
};

export function useUsers() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const token = await getToken();
      return apiClient<User[]>('/api/v1/users', { token: token || undefined });
    },
  });
}

export function useSyncUser() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SyncUserPayload) => {
      const token = await getToken();
      return apiClient<User>('/api/v1/users', {
        method: 'POST',
        body: payload,
        token: token || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
