import { useMutation } from '@tanstack/react-query';
import {
  authService,
  LoginPayload,
  LoginResponse,
} from '@/app/services/auth.service';

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: authService.login,
  });
};
