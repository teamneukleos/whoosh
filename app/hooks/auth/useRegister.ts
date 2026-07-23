import { useMutation } from '@tanstack/react-query';
import {
  authService,
  RegisterPayload,
  RegisterResponse,
} from '@/app/services/auth.service';

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: authService.register,
  });
};