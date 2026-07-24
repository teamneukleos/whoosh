'use client';

import { useRouter } from 'next/navigation';
import { clearAuthSession } from '@/app/lib/auth-session';
import { setAuthToken } from '@/app/lib/axios';

export function useLogout() {
  const router = useRouter();

  return function logout() {
    clearAuthSession();
    setAuthToken(null);
    router.push('/login');
  };
}
