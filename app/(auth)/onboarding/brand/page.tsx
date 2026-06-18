'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const INDUSTRIES = [
  'FMCG',
  'Fintech',
  'Fashion & Apparel',
  'Beauty & Skincare',
  'Food & Beverage',
  'Health & Wellness',
  'Technology',
  'Telecommunications',
  'Entertainment & Media',
  'E-commerce & Retail',
  'Education',
  'Travel & Hospitality',
  'Real Estate',
  'Automotive',
  'Other',
];

const LOCATIONS = [
  'Lagos',
  'Abuja',
  'Port Harcourt',
  'Kano',
  'Ibadan',
  'Enugu',
  'Kaduna',
  'Benin City',
  'Onitsha',
  'Warri',
  'Pan-Nigeria',
  'Nigeria & Ghana',
  'Nigeria & Kenya',
  'All of Africa',
];

export default function BrandOnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="flex items-center border-b border-gray-200 px-6 py-4">
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="Whoosh"
            width={100}
            height={60}
            priority
          />
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">

          <h1 className="text-2xl font-bold text-[#091B68]">
            Tell us about your business
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            Lets get you started
          </p>

          <div className="mt-7 flex flex-col gap-5">

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Company/Brand Name
              </label>
              <input
                type="text"
                placeholder="Enter your company email"
                className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Website <span className="text-[#98A2B3]">(Optional)</span>
              </label>
              <input
                type="url"
                placeholder="Enter your website url"
                className="w-full rounded border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Industry
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full appearance-none rounded border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
                >
                  <option value="" disabled>
                    Industry you operate in
                  </option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry} className="text-[#191C1D]">
                      {industry}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-[#191C1D]">
                Location
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full appearance-none rounded border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
                >
                  <option value="" disabled>
                    Where do you primarily operate
                  </option>
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location} className="text-[#191C1D]">
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
              </div>
            </div>

          </div>

          <button
            type="button"
            className="mt-7 w-full rounded bg-[#091B68] py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue
          </button>

        </div>
      </main>

    </div>
  );
}