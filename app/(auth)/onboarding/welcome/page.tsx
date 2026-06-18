'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex flex-col">

      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <Link href="/">
          <Image src="/logo/logo.svg" alt="Whoosh" width={80} height={24} priority />
        </Link>
        <button
          type="button"
          onClick={() => router.push('/discover')}
          className="text-sm text-[#191C1D] hover:text-[#091B68] transition-colors"
        >
          Skip
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[456px] rounded-lg bg-white px-8 py-8 shadow-md">

          <div className="mb-5">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 2L24 7.5L30.5 6L31 13L37.5 15L34.5 20L37.5 25L31 27L30.5 34L24 32.5L20 38L16 32.5L9.5 34L9 27L2.5 25L5.5 20L2.5 15L9 13L9.5 6L16 7.5L20 2Z"
                fill="#003AF4"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 20L18 25L27 15"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-black text-[#003AF4] leading-tight">
            Welcome to Woosh Ecosystem
          </h2>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            You are all set
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/campaign')}
              className="rounded bg-[#091B68] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Create a brief
            </button>
            <button
              type="button"
              onClick={() => router.push('/discover')}
              className="rounded border border-[#1C52FF] bg-white px-6 py-2.5 text-sm font-medium text-[#091B68] transition hover:bg-[#f0f4ff]"
            >
              Go to Dashboard
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}