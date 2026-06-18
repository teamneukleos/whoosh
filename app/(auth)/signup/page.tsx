'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type AccountType = 'Brand' | 'Agency' | 'Creator';

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType>('Brand');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  function handleSignup() {
    if (!agreed) return;
    if (accountType === 'Brand') {
      router.push('/onboarding/brand');
    } else if (accountType === 'Agency') {
      router.push('/onboarding/agency');
    } else {
      router.push('/onboarding/creator');
    }
  }

  function handleSocialSignup() {
    if (accountType === 'Brand') {
      router.push('/onboarding/brand');
    } else if (accountType === 'Agency') {
      router.push('/onboarding/agency');
    } else {
      router.push('/onboarding/creator');
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="flex items-center justify-center border-b border-gray-200 px-6 py-4">
        <Image src="/logo/favicon.svg" alt="Whoosh" width={40} height={24} priority />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">

          <h1 className="text-2xl font-bold text-[#091B68]">
            Lets Create your Account
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Enter your details to get started with Whoosh
          </p>

          {/* Account type toggle */}
          <div className="mt-6">
            <p className="mb-2 text-sm text-[#191C1D]">Tell us who you are</p>
            <div className="grid grid-cols-3 rounded border border-[#CBD5FF] overflow-hidden">
              {(['Brand', 'Agency', 'Creator'] as AccountType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccountType(type)}
                  className={`py-2.5 text-sm font-medium transition-colors ${
                    accountType === type
                      ? 'bg-[#D8E1FF] text-[#091B68]'
                      : 'bg-white text-[#667085] hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4">

            {/* Name field — Brand only */}
            {accountType === 'Brand' && (
              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">
                  Brand / Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your brand name"
                  className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
                />
              </div>
            )}

            {/* Name field — Creator only */}
            {accountType === 'Creator' && (
              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
                />
              </div>
            )}

            {/* Agency name field */}
            {accountType === 'Agency' && (
              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">
                  Agency Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your agency name"
                  className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
              />
            </div>

          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[#091B68]"
            />
            <span className="text-sm text-[#4B4E5F]">
              I agree to the{' '}
              <Link href="/terms" className="text-[#091B68] underline underline-offset-2">
                terms &amp; policy
              </Link>
            </span>
          </label>

          <button
            type="button"
            onClick={handleSignup}
            disabled={!agreed}
            className="mt-5 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            Signup
          </button>

          <div className="my-5 flex items-center gap-3">
            <span className="flex-1 border-t border-[#E5E7EB]" />
            <span className="text-xs text-[#98A2B3]">Or</span>
            <span className="flex-1 border-t border-[#E5E7EB]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSocialSignup}
              className="flex items-center justify-center gap-2 rounded border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#191C1D] transition hover:bg-gray-50"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={handleSocialSignup}
              className="flex items-center justify-center gap-2 rounded border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#191C1D] transition hover:bg-gray-50"
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path
                  d="M13.544 9.573c-.02-2.107 1.72-3.124 1.8-3.175-.983-1.437-2.51-1.633-3.052-1.654-1.295-.132-2.533.77-3.19.77-.659 0-1.672-.753-2.751-.731-1.408.021-2.712.826-3.435 2.093C1.106 9.25 2.15 13.3 3.836 15.16c.838.958 1.831 2.034 3.134 1.988 1.262-.05 1.737-.808 3.262-.808 1.524 0 1.959.808 3.285.782 1.357-.023 2.213-1.002 3.042-1.965a9.38 9.38 0 0 0 1.38-2.227c-.032-.012-2.647-1.012-2.674-4.014l.279.657ZM11.31 3.163c.685-.844 1.149-2.003 1.02-3.163-.988.041-2.217.667-2.928 1.493-.635.737-1.197 1.929-1.047 3.062 1.107.082 2.243-.561 2.955-1.392Z"
                  fill="#000"
                />
              </svg>
              Sign in with Apple
            </button>
          </div>

          <p className="mt-6 text-sm text-[#4B4E5F]">
            Have an account?{' '}
            <Link href="/login" className="font-medium text-[#091B68]">
              Sign In
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}
