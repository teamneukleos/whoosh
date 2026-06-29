import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">
            How Whoosh Powers Success
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5B6170] lg:text-lg">
            A structured path from finding the right voice to achieving measurable growth
            in the fastest-growing market on Earth.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-20 flex flex-col gap-20">

          {/* STEP 01 — text left, image right */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Text */}
            <div>
              <span className="text-5xl font-bold text-[#D1D5DB]">01</span>
              <h3 className="mt-3 text-2xl font-bold text-[#171A22] lg:text-3xl">
                Post Your Creative Brief
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5B6170]">
                Describe your brand objectives, target audience, and campaign
                goals. Our AI-driven engine suggests the best matching creators
                based on historical performance data.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm text-[#171A22]">
                  <CheckCircle size={18} className="shrink-0 text-[#091B68]" fill="#00563F" color="white" />
                  Define goals and KPIs
                </li>
                <li className="flex items-center gap-3 text-sm text-[#171A22]">
                  <CheckCircle size={18} className="shrink-0 text-[#091B68]" fill="#00563F" color="white" />
                  Set your budget and timeline
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="relative h-[280px] w-full lg:h-[340px]">
              <Image
                src="/how-it-works/brief.png"
                alt="Post your creative brief"
                fill
                className="object-cover rounded-sm"
              />
            </div>

          </div>

          {/* STEP 02 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <div className="relative order-2 h-[280px] w-full lg:order-1 lg:h-[340px]">
              <Image
                src="/how-it-works/squad.png"
                alt="Curate your creator squad"
                fill
                className="object-cover rounded-sm"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-5xl font-bold text-[#D1D5DB]">02</span>
              <h3 className="mt-3 text-2xl font-bold text-[#171A22] lg:text-3xl">
                Curate Your Creator Squad
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5B6170]">
                Review applications and curated suggestions. Access deep-dive
                analytics for every creator, including audience demographics
                and sentiment analysis.
              </p>

              {/* Avatar stack */}
              <div className="mt-6 flex items-center">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  <Image src="/avatars/creator-1.png" alt="Creator" fill className="object-cover" />
                </div>
                <div className="relative -ml-3 h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  <Image src="/avatars/creator-2.png" alt="Creator" fill className="object-cover" />
                </div>
                <div className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#EEF0FF] text-xs font-semibold text-[#091B68]">
                  +42
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}