'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AgencyOnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center border-b border-gray-200 px-6 py-4">
        <Link href="/">
          <Image src="/logo/logo.svg" alt="Kreate" width={100} height={60} priority />
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">
          <h1 className="text-2xl font-bold text-[#091B68]">
            Agency onboarding
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Agency setup is coming soon. Continue to the dashboard for now.
          </p>

          <button
            type="button"
            onClick={() => router.push('/discover')}
            className="mt-7 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
