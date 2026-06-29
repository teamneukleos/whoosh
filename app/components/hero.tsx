'use client';

import Image from 'next/image';
import Link from 'next/link';

function LiveEngagementIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#A1B7FF" />
      <path
        d="M15 33V31L17 29V33H15ZM19 33V27L21 25V33H19ZM23 33V25L25 27.025V33H23ZM27 33V27.025L29 25.025V33H27ZM31 33V23L33 21V33H31ZM15 27.825V25L22 18L26 22L33 15V17.825L26 24.825L22 20.825L15 27.825Z"
        fill="#091B68"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="bg-[#F7F7F7] pt-4">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>
            <span className="inline-block rounded-sm bg-[#091B68] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              The African Creator Economy
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-[#171A22] lg:text-5xl">
              The Creator Marketplace{' '}
              <span className="text-[#1D4EFF]">Built for Africa</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5B6170] lg:text-lg">
              Discover, manage, and pay verified creators at scale. Kreate helps brands
              run measurable creator campaigns while giving creators reliable opportunities
              and fast payouts.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6170]">For Brands</span>
                <Link
                  href="/campaigns/create"
                  className="rounded bg-[#091B68] px-8 py-4 text-center font-semibold text-white transition hover:opacity-90"
                >
                  Start a Campaign
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6170]">For Creators</span>
                <Link
                  href="/signup"
                  className="rounded border border-[#091B68] px-8 py-4 text-center font-semibold text-[#091B68] transition hover:bg-[#091B68] hover:text-white"
                >
                  Join as a Creator
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div className="flex flex-col gap-3 lg:hidden">
              <div className="relative h-[440px] w-[290px]">
                <Image
                  src="/hero-images/hero-creator.png"
                  alt="African Creator"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-xs bg-white px-4 py-3 shadow-sm">
                  <div className="shrink-0">
                    <LiveEngagementIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Live Engagement</p>
                    <h3 className="text-2xl font-bold leading-tight text-[#091B68]">12.4K</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto hidden h-[520px] max-w-[500px] lg:block">
              <div className="absolute left-0 top-0 h-[440px] w-[290px] sm:w-[310px]">
                <Image
                  src="/hero-images/hero-creator.png"
                  alt="African Creator"
                  fill
                  className="rounded-xs object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-xs bg-white px-4 py-3 shadow-sm">
                  <div className="shrink-0">
                    <LiveEngagementIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Live Engagement</p>
                    <h3 className="text-2xl font-bold leading-tight text-[#091B68]">12.4K</h3>
                  </div>
                </div>
              </div>

              <div className="absolute left-[310px] top-10 flex flex-col gap-3 sm:left-[330px]">
                <div className="flex h-[120px] w-[155px] flex-col justify-center rounded-xs p-4">
                  <span className="w-fit rounded-md bg-[#A6F2D1] px-3 py-1 text-xs font-semibold text-[#0B5D3A]">
                    ROI +240%
                  </span>
                  <h4 className="mt-3 text-base font-semibold text-[#171A22]">Tech Review</h4>
                </div>

                <div className="relative h-[180px] w-[155px] overflow-hidden rounded-xs">
                  <Image
                    src="/hero-images/hero-creator-2.png"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
