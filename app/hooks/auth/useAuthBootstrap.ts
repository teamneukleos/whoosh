'use client';

import { useEffect } from 'react';
import { loadAuthSession } from '@/app/lib/auth-session';
import { setAuthToken } from '@/app/lib/axios';

export function useAuthBootstrap() {
  useEffect(() => {
    const session = loadAuthSession();
    if (session?.accessToken) {
      setAuthToken(session.accessToken);
    }
  }, []);
}
