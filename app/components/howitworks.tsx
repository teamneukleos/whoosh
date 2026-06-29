import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create a Campaign',
    description:
      'Define your goals, audience, deliverables, budget, and timeline.',
    image: '/how-it-works/brief.png',
    alt: 'Create a campaign',
  },
  {
    number: '02',
    title: 'Find the Right Creators',
    description:
      'Use smart filters and AI-powered matching to discover creators that fit your brand.',
    image: '/how-it-works/squad.png',
    alt: 'Find the right creators',
  },
  {
    number: '03',
    title: 'Manage Deliverables',
    description:
      'Approve content, request revisions, and monitor progress from one dashboard.',
    image: '/hero-images/hero-creator.png',
    alt: 'Manage deliverables',
  },
  {
    number: '04',
    title: 'Measure Results',
    description:
      'Track campaign performance and ROI with real-time analytics.',
    image: '/hero-images/hero-creator-2.png',
    alt: 'Measure results',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5B6170] lg:text-lg">
            For Brands
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-20">
          {steps.map((step, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <div
                key={step.number}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={imageFirst ? 'order-2' : ''}>
                  <span className="text-5xl font-bold text-[#D1D5DB]">{step.number}</span>
                  <h3 className="mt-3 text-2xl font-bold text-[#171A22] lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#5B6170]">
                    {step.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-[#171A22]">
                    <CheckCircle size={18} className="shrink-0 text-[#091B68]" fill="#00563F" color="white" />
                    Step {index + 1} of 4
                  </div>
                </div>

                <div className={`relative h-[280px] w-full lg:h-[340px] ${imageFirst ? 'order-1' : ''}`}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="rounded-sm object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
