import { useMutation } from '@tanstack/react-query';
import {
  authService,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '@/app/services/auth.service';

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: authService.resetPassword,
  });
};
