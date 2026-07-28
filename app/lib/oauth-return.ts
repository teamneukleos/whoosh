const OAUTH_RETURN_KEY = 'woosh_youtube_oauth_return';

export function setYouTubeOAuthReturn(path: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(OAUTH_RETURN_KEY, path);
}

export function consumeYouTubeOAuthReturn(fallback = '/onboarding/socials'): string {
  if (typeof window === 'undefined') return fallback;
  const stored = sessionStorage.getItem(OAUTH_RETURN_KEY);
  sessionStorage.removeItem(OAUTH_RETURN_KEY);
  return stored || fallback;
}
