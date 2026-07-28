'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SocialAccountsPanel from '@/app/components/SocialAccountsPanel';

function OnboardingSocialsContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="Woosh"
            width={80}
            height={24}
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => router.push('/discover')}
          className="text-sm text-[#191C1D] hover:text-[#091B68] transition-colors"
        >
          Skip for now
        </button>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[480px]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Optional
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#091B68]">
            Connect your socials
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Link YouTube so brands can verify your audience. You can skip this
            and connect later from Settings.
          </p>

          <div className="mt-7">
            <SocialAccountsPanel
              returnPath="/onboarding/socials"
              showManagementActions={false}
            />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/discover')}
              className="rounded bg-[#091B68] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue to dashboard
            </button>
            <button
              type="button"
              onClick={() => router.push('/discover')}
              className="rounded border border-[#D0D5DD] bg-white px-6 py-2.5 text-sm font-medium text-[#191C1D] transition hover:bg-gray-50"
            >
              Skip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingSocialsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[#4B4E5F]">
          Loading social connections...
        </div>
      }
    >
      <OnboardingSocialsContent />
    </Suspense>
  );
}
