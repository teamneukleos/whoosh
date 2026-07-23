import axios from 'axios';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string | string[]; error?: string }
      | undefined;

    if (typeof data?.message === 'string') return data.message;
    if (Array.isArray(data?.message)) return data.message.join(', ');
    if (typeof data?.error === 'string') return data.error;

    if (error.response?.status === 409) {
      return 'An account with this email already exists. Sign in to continue your setup.';
    }
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function isEmailAlreadyExistsError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  return error.response?.status === 409;
}
