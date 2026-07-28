'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import SocialAccountsPanel from '@/app/components/SocialAccountsPanel';

function SettingsSocialsContent() {
  return (
    <div className="min-h-screen bg-white">
      <main className="lg:pl-[264px] pt-[72px]">
        <div className="mx-auto max-w-2xl px-8 py-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Settings
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#091B68]">
            Social accounts
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Connect, sync, or disconnect the platforms brands use to evaluate
            your reach.
          </p>

          <div className="mt-7">
            <SocialAccountsPanel
              returnPath="/settings/socials"
              showManagementActions
            />
          </div>

          <p className="mt-6 text-sm text-[#4B4E5F]">
            Need help?{' '}
            <Link href="/discover" className="font-medium text-[#091B68]">
              Back to Discovery
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function SettingsSocialsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[#4B4E5F]">
          Loading social settings...
        </div>
      }
    >
      <SettingsSocialsContent />
    </Suspense>
  );
}
