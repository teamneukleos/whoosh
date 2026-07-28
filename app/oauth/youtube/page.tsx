'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { consumeYouTubeOAuthReturn } from '@/app/lib/oauth-return';

function OAuthYouTubeCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnPath = consumeYouTubeOAuthReturn('/onboarding/socials');
    const params = new URLSearchParams();

    const youtube = searchParams.get('youtube');
    const message = searchParams.get('message');

    if (youtube) params.set('youtube', youtube);
    if (message) params.set('message', message);

    const query = params.toString();
    router.replace(query ? `${returnPath}?${query}` : returnPath);
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-[#4B4E5F]">
      Finishing YouTube connection...
    </div>
  );
}

export default function OAuthYouTubeCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[#4B4E5F]">
          Finishing YouTube connection...
        </div>
      }
    >
      <OAuthYouTubeCallbackContent />
    </Suspense>
  );
}
