'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForgotPassword } from '@/app/hooks/auth/useForgotPassword';
import { getApiErrorMessage } from '@/app/lib/api-error';

const inputClassName =
  'w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors';

export default function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit() {
    setError(null);
    setSuccessMessage(null);

    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          setSuccessMessage(data.message);
        },
        onError: (err) => {
          setError(
            getApiErrorMessage(err, 'Could not send reset link. Please try again.')
          );
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-center border-b border-gray-200 px-6 py-4">
        <Image src="/logo/favicon.svg" alt="Kreate" width={40} height={24} priority />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">
          <h1 className="text-2xl font-bold text-[#091B68]">Forgot password?</h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 rounded border border-[#CBD5FF] bg-[#EEF0FF] px-4 py-3 text-sm text-[#091B68]">
              {successMessage}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClassName}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!email.trim() || isPending}
              className="mt-2 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Sending link...' : 'Send reset link'}
            </button>
          </div>

          <p className="mt-6 text-sm text-[#4B4E5F]">
            Remember your password?{' '}
            <Link href="/login" className="font-medium text-[#091B68]">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
