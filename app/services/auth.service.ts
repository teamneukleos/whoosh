import { api } from "../lib/axios";

export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  intendedRole: 'BRAND' | 'CREATOR';
}

export interface RegisterResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    intendedRole: 'BRAND' | 'CREATOR';
    avatarUrl: unknown;
    createdAt: string;
  };
}

export const authService = {
  register: async (
    data: RegisterPayload
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      data
    );

    return response.data;
  },
};