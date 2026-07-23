import { useMutation } from '@tanstack/react-query';
import {
  authService,
  BrandOnboardPayload,
  BrandOnboardResponse,
} from '@/app/services/auth.service';

export const useOnboardBrand = () => {
  return useMutation<BrandOnboardResponse, Error, BrandOnboardPayload>({
    mutationFn: authService.onboardBrand,
  });
};
