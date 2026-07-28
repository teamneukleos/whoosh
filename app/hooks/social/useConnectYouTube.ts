import { useMutation } from '@tanstack/react-query';
import { socialService } from '@/app/services/social.service';
import { setYouTubeOAuthReturn } from '@/app/lib/oauth-return';

export function useConnectYouTube() {
  return useMutation({
    mutationFn: async (returnPath: string) => {
      setYouTubeOAuthReturn(returnPath);
      const { authorizationUrl } = await socialService.getYouTubeConnectUrl();
      return authorizationUrl;
    },
    onSuccess: (authorizationUrl) => {
      window.location.assign(authorizationUrl);
    },
  });
}
