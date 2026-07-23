import { useMutation } from '@tanstack/react-query';
import {
  authService,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from '@/app/services/auth.service';

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationFn: authService.forgotPassword,
  });
};
