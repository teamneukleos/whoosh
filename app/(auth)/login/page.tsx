'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/app/hooks/auth/useLogin';
import PasswordInput from '@/app/components/passwordinput';
import { authService, toAuthUser } from '@/app/services/auth.service';
import { setAuthToken } from '@/app/lib/axios';
import { saveAuthSession } from '@/app/lib/auth-session';
import { getApiErrorMessage } from '@/app/lib/api-error';

const inputClassName =
  'w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors';

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);

    login(
      { email, password },
      {
        onSuccess: async (data) => {
          setAuthToken(data.accessToken);

          const me = await authService.getMe();

          saveAuthSession({
            accessToken: data.accessToken,
            user: toAuthUser(me),
            onboardingComplete: !me.needsOnboarding,
          });

          if (me.needsOnboarding) {
            router.push('/signup');
            return;
          }

          router.push(
            me.intendedRole === 'BRAND' ? '/onboarding/goals' : '/discover'
          );
        },
        onError: (err) => {
          setError(getApiErrorMessage(err, 'Sign in failed. Please try again.'));
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
          <h1 className="text-2xl font-bold text-[#091B68]">Welcome back</h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Sign in to continue. If you haven&apos;t finished setup, we&apos;ll take you
            to the right onboarding step.
          </p>

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
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

            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              labelRight={
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#091B68] hover:underline"
                >
                  Forgot password?
                </Link>
              }
            />

            <button
              type="button"
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim() || isPending}
              className="mt-2 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-6 text-sm text-[#4B4E5F]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-[#091B68]">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
