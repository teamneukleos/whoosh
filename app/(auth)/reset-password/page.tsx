'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/app/hooks/auth/useResetPassword';
import { getApiErrorMessage } from '@/app/lib/api-error';
import PasswordInput from '@/app/components/passwordinput';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { mutate: resetPassword, isPending } = useResetPassword();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit() {
    setError(null);
    setSuccessMessage(null);

    if (!token) {
      setError('Reset token is missing. Please use the link from your email.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    resetPassword(
      { token, newPassword },
      {
        onSuccess: (data) => {
          setSuccessMessage(data.message);
          setTimeout(() => router.push('/login'), 2000);
        },
        onError: (err) => {
          setError(getApiErrorMessage(err, 'Could not reset password. Please try again.'));
        },
      }
    );
  }

  return (
    <>
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
        <PasswordInput
          label="New password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Create a new password"
        />

        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your new password"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!newPassword.trim() || !confirmPassword.trim() || isPending}
          className="mt-2 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Resetting password...' : 'Reset password'}
        </button>
      </div>

      <p className="mt-6 text-sm text-[#4B4E5F]">
        Back to{' '}
        <Link href="/login" className="font-medium text-[#091B68]">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-center border-b border-gray-200 px-6 py-4">
        <Image src="/logo/favicon.svg" alt="Kreate" width={40} height={24} priority />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">
          <h1 className="text-2xl font-bold text-[#091B68]">Reset password</h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Enter a new password for your account.
          </p>

          <Suspense
            fallback={
              <p className="mt-5 text-sm text-[#4B4E5F]">Loading reset form...</p>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
