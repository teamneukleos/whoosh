import Link from 'next/link';

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl bg-white px-6 py-8 lg:px-10">
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-16 text-center lg:px-16 lg:py-24"
        style={{ backgroundColor: '#005540' }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: '#00288E' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: '#AB3600' }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-white lg:text-3xl">
            Ready to Scale in Africa?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 lg:text-md" style={{ color: '#E1E3E4' }}>
            Join 500+ global brands already leveraging the power of Woosh to <br />
            reach millions of new consumers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/campaigns/create"
              className="w-full rounded px-8 py-4 text-center font-semibold transition hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: '#A1B7FF', color: '#091B68' }}
            >
              Launch a Campaign
            </Link>

            <Link
              href="/contact"
              className="w-full rounded border px-8 py-4 text-center font-semibold transition hover:opacity-80 sm:w-auto"
              style={{ borderColor: '#E1E3E4', color: '#E1E3E4' }}
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}