import { useMutation } from '@tanstack/react-query';
import {
  authService,
  CreatorOnboardPayload,
  CreatorOnboardResponse,
} from '@/app/services/auth.service';

export const useOnboardCreator = () => {
  return useMutation<CreatorOnboardResponse, Error, CreatorOnboardPayload>({
    mutationFn: authService.onboardCreator,
  });
};
