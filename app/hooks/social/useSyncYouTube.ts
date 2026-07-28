import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialService } from '@/app/services/social.service';
import { socialConnectionsQueryKey } from './useSocialConnections';

export function useSyncYouTube() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: socialService.syncYouTube,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: socialConnectionsQueryKey });
    },
  });
}
