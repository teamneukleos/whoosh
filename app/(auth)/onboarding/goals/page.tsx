'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const GOALS = [
  'Increase Brand Awareness',
  'Build a community',
  'Drive app installs/traffic',
  'Create Authentic Content (UGC)',
  'Convert Sales & Drive Revenue',
  'Others',
];

const BUDGET_RANGES = [
  'Under ₦100,000',
  '₦100,000 – ₦250,000',
  '₦250,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  '₦1,000,000 – ₦5,000,000',
  'Above ₦5,000,000',
];

export default function BrandGoalsPage() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  function toggleGoal(goal: string) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="Whoosh"
            width={80}
            height={24}
            priority
          />
        </Link>
        <Link
          href="/discover"
          className="text-sm text-[#191C1D] hover:text-[#091B68] transition-colors"
        >
          Skip
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">

          <h1 className="text-2xl font-bold text-[#091B68]">
            Lets define your Goals
          </h1>
          <p className="mt-1.5 text-sm text-[#4B4E5F]">
            What are you looking to achieve
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {GOALS.map((goal) => {
              const active = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`rounded border px-4 py-2 text-sm transition-colors ${
                    active
                      ? 'border-[#091B68] bg-[#D8E1FF] text-[#091B68]'
                      : 'border-[#D0D5DD] bg-white text-[#191C1D] hover:border-[#091B68]'
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            <label className="mb-1.5 block text-sm text-[#191C1D]">
              What is your Campaign Budget?
            </label>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full appearance-none rounded border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#98A2B3] outline-none focus:border-[#091B68] transition-colors"
              >
                <option value="" disabled>
                  Campaign Budget
                </option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range} className="text-[#191C1D]">
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
              />
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