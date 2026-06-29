import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Get discovered by brands',
  'Receive reliable payments',
  'Build a professional creator profile',
  'Manage briefs and deliverables in one place',
  'Grow your creator business',
];

export default function CreatorSection() {
  return (
    <section id="creators" className="bg-[#091B68] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Turn Your Content Into Consistent Income
            </h2>
            <p className="mt-4 text-base leading-7 text-[#DDE3FF] lg:text-lg">
              Join a growing network of verified creators and access paid opportunities
              from brands across Nigeria.
            </p>

            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-[#A1B7FF]">
              Benefits
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-white lg:text-base">
                  <CheckCircle size={18} className="shrink-0 text-[#A6F2D1]" fill="#A6F2D1" color="#091B68" />
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="mt-10 inline-block rounded bg-[#A1B7FF] px-8 py-4 font-semibold text-[#091B68] transition hover:opacity-90"
            >
              Join as a Creator
            </Link>
          </div>

          <div className="rounded-sm border border-white/10 bg-white/5 p-6 lg:p-8">
            <div className="space-y-4">
              <div className="rounded-xs bg-white/10 p-4">
                <p className="text-xs text-white/60">Profile Views This Week</p>
                <p className="mt-1 text-2xl font-bold text-white">1,284</p>
              </div>
              <div className="rounded-xs bg-white/10 p-4">
                <p className="text-xs text-white/60">Pending Invitations</p>
                <p className="mt-1 text-2xl font-bold text-white">5</p>
              </div>
              <div className="rounded-xs bg-[#A1B7FF] p-4">
                <p className="text-xs text-[#091B68]/70">Next Payout</p>
                <p className="mt-1 text-2xl font-bold text-[#091B68]">₦185,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
