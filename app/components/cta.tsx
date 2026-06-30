import Link from 'next/link';

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl bg-white px-6 py-8 lg:px-10">
      <div className="relative overflow-hidden rounded-sm bg-[#091B68] px-8 py-16 text-center lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#1D4EFF] opacity-20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#A1B7FF] opacity-20 blur-[120px]" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            Ready to Run Better Creator Campaigns?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#DDE3FF] lg:text-base">
            Join the platform built specifically for African brands and creators.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="flex w-full flex-col gap-1 sm:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A1B7FF]">
                For Brands
              </span>
              <Link
                href="/campaigns/create"
                className="w-full rounded-full bg-[#A1B7FF] px-8 py-4 text-center font-semibold text-[#091B68] transition hover:opacity-90 sm:w-auto"
              >
                Launch Your First Campaign
              </Link>
            </div>

            <div className="flex w-full flex-col gap-1 sm:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A1B7FF]">
                For Creators
              </span>
              <Link
                href="/signup"
                className="w-full rounded-full border border-[#A1B7FF] px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Apply to Join Whoosh
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
