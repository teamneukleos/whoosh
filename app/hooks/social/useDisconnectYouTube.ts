import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialService } from '@/app/services/social.service';
import { socialConnectionsQueryKey } from './useSocialConnections';

export function useDisconnectYouTube() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: socialService.disconnectYouTube,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: socialConnectionsQueryKey });
    },
  });
}
