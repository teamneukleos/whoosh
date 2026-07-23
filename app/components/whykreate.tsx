import { Globe, MapPin, Shield, Users } from 'lucide-react';

const reasons = [
  {
    icon: MapPin,
    title: 'Local Creator Intelligence',
    description:
      'Discover creators across major Nigerian cities and cultural communities.',
  },
  {
    icon: Globe,
    title: 'Fast Local Payments',
    description:
      'Pay creators directly in Naira through trusted payment providers.',
  },
  {
    icon: Users,
    title: 'Agency Expertise',
    description:
      'Built by the team behind successful creator campaigns for African brands.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description:
      'Verified creators, authenticity scoring, and escrow-backed payments.',
  },
];

export default function WhyKreate() {
  return (
    <section id="why-kreate" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">
            Built for the African Creator Economy
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5B6170] lg:text-lg">
            Unlike global influencer platforms, Whoosh is designed around how creator
            marketing actually works in Nigeria and Africa.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-sm border border-[#D7DDF0] bg-[#F8F9FC] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF0FF]">
                <Icon size={22} className="text-[#091B68]" />
              </div>
              <h3 className="text-lg font-bold text-[#171A22]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5B6170] lg:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
