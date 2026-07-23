'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useRegister } from '@/app/hooks/auth/useRegister';
import { useOnboardCreator } from '@/app/hooks/auth/useOnboardCreator';
import { useOnboardBrand } from '@/app/hooks/auth/useOnboardBrand';
import { authService, toAuthUser, type BrandIndustry } from '@/app/services/auth.service';
import { setAuthToken } from '@/app/lib/axios';
import {
  intendedRoleToLabel,
  clearAuthSession,
  loadAuthSession,
  markOnboardingComplete,
  saveAuthSession,
} from '@/app/lib/auth-session';
import { getApiErrorMessage, isEmailAlreadyExistsError } from '@/app/lib/api-error';
import PasswordInput from '@/app/components/passwordinput';

type IntendedRole = 'Brand' | 'Creator';
type Step = 1 | 2;
type Language = 'EN' | 'PIDGIN' | 'YORUBA' | 'HAUSA' | 'IGBO';
type CreatorTier = 'NANO' | 'MICRO' | 'MID' | 'MACRO';

const inputClassName =
  'w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors';

const selectClassName =
  'w-full appearance-none rounded border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#191C1D] outline-none focus:border-[#091B68] transition-colors';

const BRAND_INDUSTRIES = [
  { label: 'FMCG', value: 'FMCG' },
  { label: 'Fintech', value: 'FINTECH' },
  { label: 'Fashion', value: 'FASHION' },
  { label: 'Telco', value: 'TELCO' },
  { label: 'Beauty', value: 'BEAUTY' },
  { label: 'Food', value: 'FOOD' },
  { label: 'Other', value: 'OTHER' },
];

const CREATOR_TIERS: { label: string; value: CreatorTier }[] = [
  { label: 'Nano (1K–10K followers)', value: 'NANO' },
  { label: 'Micro (10K–100K followers)', value: 'MICRO' },
  { label: 'Mid (100K–500K followers)', value: 'MID' },
  { label: 'Macro (500K+ followers)', value: 'MACRO' },
];

const LANGUAGES: { label: string; value: Language }[] = [
  { label: 'English', value: 'EN' },
  { label: 'Pidgin', value: 'PIDGIN' },
  { label: 'Yoruba', value: 'YORUBA' },
  { label: 'Hausa', value: 'HAUSA' },
  { label: 'Igbo', value: 'IGBO' },
];

const NIGERIAN_STATES = [
  'Lagos',
  'Abuja',
  'Rivers',
  'Kano',
  'Oyo',
  'Enugu',
  'Kaduna',
  'Edo',
  'Delta',
  'Ogun',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#191C1D]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClassName}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
        />
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [intendedRole, setIntendedRole] = useState<IntendedRole>('Brand');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResuming, setIsResuming] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const { mutate: register, isPending: isRegistering } = useRegister();
  const { mutate: onboardCreator, isPending: isOnboardingCreator } = useOnboardCreator();
  const { mutate: onboardBrand, isPending: isOnboardingBrand } = useOnboardBrand();

  const isSubmitting = isRegistering || isOnboardingCreator || isOnboardingBrand;

  // Step 1 — register
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2 — creator onboard
  const [displayName, setDisplayName] = useState('');
  const [locationState, setLocationState] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [bio, setBio] = useState('');
  const [tier, setTier] = useState<CreatorTier>('NANO');
  const [primaryLanguage, setPrimaryLanguage] = useState<Language>('EN');
  const [languages, setLanguages] = useState<Language[]>(['EN']);
  const [referredByCode, setReferredByCode] = useState('');

  // Step 2 — brand onboard
  const [brandName, setBrandName] = useState('');
  const [slug, setSlug] = useState('');
  const [industry, setIndustry] = useState<BrandIndustry | ''>('');
  const [billingEmail, setBillingEmail] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    async function resumeIncompleteSignup() {
      const session = loadAuthSession();
      if (!session) {
        setIsCheckingSession(false);
        return;
      }

      setAuthToken(session.accessToken);

      try {
        const me = await authService.getMe();

        saveAuthSession({
          accessToken: session.accessToken,
          user: toAuthUser(me),
          onboardingComplete: !me.needsOnboarding,
        });

        if (!me.needsOnboarding) {
          markOnboardingComplete();
          router.replace(
            me.intendedRole === 'BRAND' ? '/onboarding/goals' : '/discover'
          );
          return;
        }

        setIntendedRole(intendedRoleToLabel(me.intendedRole));
        setEmail(me.email);
        setFirstName(me.firstName);
        setLastName(me.lastName);
        setAgreed(true);
        setIsResuming(true);
        setStep(2);
      } catch {
        clearAuthSession();
      } finally {
        setIsCheckingSession(false);
      }
    }

    resumeIncompleteSignup();
  }, [router]);

  function toggleLanguage(language: Language) {
    setLanguages((current) => {
      if (current.includes(language)) {
        const next = current.filter((item) => item !== language);
        return next.length ? next : [language];
      }
      return [...current, language];
    });
  }

  function handleRegister() {
    if (!agreed) return;

    setError(null);

    register(
      {
        email,
        firstName,
        lastName,
        password,
        intendedRole: intendedRole === 'Brand' ? 'BRAND' : 'CREATOR',
      },
      {
        onSuccess: (data) => {
          setAuthToken(data.accessToken);
          saveAuthSession({
            accessToken: data.accessToken,
            user: data.user,
            onboardingComplete: false,
          });
          setIsResuming(false);
          setStep(2);
        },
        onError: (err) => {
          if (isEmailAlreadyExistsError(err)) {
            setError(
              'An account with this email already exists. Sign in to continue your setup.'
            );
            return;
          }
          setError(getApiErrorMessage(err, 'Registration failed. Please try again.'));
        },
      }
    );
  }

  function handleOnboard() {
    setError(null);

    if (intendedRole === 'Creator') {
      onboardCreator(
        {
          displayName,
          locationState,
          locationCity,
          bio,
          tier,
          primaryLanguage,
          languages,
          ...(referredByCode ? { referredByCode } : {}),
        },
        {
          onSuccess: () => {
            markOnboardingComplete();
            router.push('/discover');
          },
          onError: (err) => {
            setError(getApiErrorMessage(err, 'Creator onboarding failed. Please try again.'));
          },
        }
      );
      return;
    }

    onboardBrand(
      {
        name: brandName,
        slug: slug || slugify(brandName),
        industry: industry as BrandIndustry,
        billingEmail,
        ...(website ? { website } : {}),
        serviceMode: 'MANAGED',
        memberRole: 'OWNER',
      },
      {
        onSuccess: () => {
          markOnboardingComplete();
          router.push('/onboarding/goals');
        },
        onError: (err) => {
          setError(getApiErrorMessage(err, 'Brand onboarding failed. Please try again.'));
        },
      }
    );
  }

  function handleBrandNameChange(value: string) {
    setBrandName(value);
    setSlug(slugify(value));
  }

  const step1Valid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password.trim() &&
    agreed;

  const creatorStep2Valid =
    displayName.trim() &&
    locationState &&
    locationCity.trim() &&
    bio.trim() &&
    languages.length > 0;

  const brandStep2Valid =
    brandName.trim() &&
    industry &&
    billingEmail.trim();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-center border-b border-gray-200 px-6 py-4">
        <Image src="/logo/favicon.svg" alt="Kreate" width={40} height={24} priority />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">
          {isCheckingSession ? (
            <p className="text-sm text-[#4B4E5F]">Loading your signup progress...</p>
          ) : (
            <>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Step {step} of 2
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#091B68]">
            {step === 1 ? 'Create your account' : intendedRole === 'Brand' ? 'Tell us about your brand' : 'Set up your creator profile'}
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            {step === 1
              ? 'Enter your details to get started with Kreate'
              : intendedRole === 'Brand'
                ? 'Complete your brand profile to start running campaigns'
                : 'Tell brands who you are and what you create'}
          </p>

          {step === 1 && (
            <div className="mt-6">
              <p className="mb-2 text-sm text-[#191C1D]">Tell us who you are</p>
              <div className="grid grid-cols-2 rounded border border-[#CBD5FF] overflow-hidden">
                {(['Brand', 'Creator'] as IntendedRole[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setIntendedRole(type)}
                    className={`py-2.5 text-sm font-medium transition-colors ${
                      intendedRole === type
                        ? 'bg-[#D8E1FF] text-[#091B68]'
                        : 'bg-white text-[#667085] hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 inline-flex rounded bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-[#091B68]">
              Registering as {intendedRole}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
              {error.includes('already exists') && (
                <p className="mt-2">
                  <Link href="/login" className="font-medium underline">
                    Sign in to continue setup
                  </Link>
                </p>
              )}
            </div>
          )}

          {isResuming && step === 2 && (
            <div className="mt-4 rounded border border-[#CBD5FF] bg-[#EEF0FF] px-4 py-3 text-sm text-[#091B68]">
              Welcome back. Finish your {intendedRole.toLowerCase()} profile to complete signup.
            </div>
          )}

          {step === 1 ? (
            <div className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm text-[#191C1D]">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-[#191C1D]">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputClassName}
                  />
                </div>
              </div>

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
                placeholder="Create a password"
              />

              <label className="flex cursor-pointer items-center gap-2.5">
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
                onClick={handleRegister}
                disabled={!step1Valid || isSubmitting}
                className="mt-2 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {isRegistering ? 'Creating account...' : 'Continue'}
              </button>
            </div>
          ) : intendedRole === 'Creator' ? (
            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ada Creates"
                  className={inputClassName}
                />
              </div>

              <SelectField
                label="State"
                value={locationState}
                onChange={setLocationState}
                placeholder="Select your state"
                options={NIGERIAN_STATES.map((state) => ({ label: state, value: state }))}
              />

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">City</label>
                <input
                  type="text"
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  placeholder="Ikeja"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Lagos food & lifestyle creator"
                  rows={3}
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <SelectField
                label="Creator Tier"
                value={tier}
                onChange={(value) => setTier(value as CreatorTier)}
                placeholder="Select your tier"
                options={CREATOR_TIERS}
              />

              <SelectField
                label="Primary Language"
                value={primaryLanguage}
                onChange={(value) => setPrimaryLanguage(value as Language)}
                placeholder="Select primary language"
                options={LANGUAGES}
              />

              <div>
                <label className="mb-2 block text-sm text-[#191C1D]">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.value}
                      type="button"
                      onClick={() => toggleLanguage(language.value)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        languages.includes(language.value)
                          ? 'bg-[#091B68] text-white'
                          : 'border border-[#D0D5DD] bg-white text-[#667085] hover:bg-gray-50'
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">
                  Referral Code <span className="text-[#98A2B3]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={referredByCode}
                  onChange={(e) => setReferredByCode(e.target.value)}
                  placeholder="KR1A2B3C4D"
                  className={inputClassName}
                />
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="w-full rounded border border-[#D0D5DD] py-3 text-sm font-semibold text-[#091B68] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleOnboard}
                  disabled={!creatorStep2Valid || isSubmitting}
                  className="w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {isOnboardingCreator ? 'Completing setup...' : 'Complete signup'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">Brand / Company Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => handleBrandNameChange(e.target.value)}
                  placeholder="Neukleos Media"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="neukleos-media"
                  className={inputClassName}
                />
              </div>

              <SelectField
                label="Industry"
                value={industry}
                onChange={(value) => setIndustry(value as BrandIndustry)}
                placeholder="Select your industry"
                options={BRAND_INDUSTRIES}
              />

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">Billing Email</label>
                <input
                  type="email"
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  placeholder="billing@brand.ng"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#191C1D]">
                  Website <span className="text-[#98A2B3]">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://brand.ng"
                  className={inputClassName}
                />
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="w-full rounded border border-[#D0D5DD] py-3 text-sm font-semibold text-[#091B68] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleOnboard}
                  disabled={!brandStep2Valid || isSubmitting}
                  className="w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {isOnboardingBrand ? 'Completing setup...' : 'Complete signup'}
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <p className="mt-6 text-sm text-[#4B4E5F]">
              Have an account?{' '}
              <Link href="/login" className="font-medium text-[#091B68]">
                Sign In
              </Link>
            </p>
          )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
