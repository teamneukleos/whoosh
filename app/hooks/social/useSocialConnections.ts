import { useQuery } from '@tanstack/react-query';
import { socialService } from '@/app/services/social.service';

export const socialConnectionsQueryKey = ['creators', 'social'] as const;

export function useSocialConnections(enabled = true) {
  return useQuery({
    queryKey: socialConnectionsQueryKey,
    queryFn: socialService.list,
    enabled,
  });
}
