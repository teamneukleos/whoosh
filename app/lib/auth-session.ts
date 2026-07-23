import type { AuthUser } from '@/app/services/auth.service';

const SESSION_KEY = 'kreate_auth_session';

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
  onboardingComplete: boolean;
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function updateAuthSession(updates: Partial<AuthSession>) {
  const current = loadAuthSession();
  if (!current) return;
  saveAuthSession({ ...current, ...updates });
}

export function markOnboardingComplete() {
  updateAuthSession({ onboardingComplete: true });
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function intendedRoleToLabel(role: AuthUser['intendedRole']): 'Brand' | 'Creator' {
  return role === 'BRAND' ? 'Brand' : 'Creator';
}

export function labelToIntendedRole(label: 'Brand' | 'Creator'): AuthUser['intendedRole'] {
  return label === 'Brand' ? 'BRAND' : 'CREATOR';
}
