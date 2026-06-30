import { BarChart3, CreditCard, Search, Settings } from 'lucide-react';

const pillars = [
  {
    icon: Search,
    title: 'Discover',
    intro: 'Find creators by',
    items: ['Niche', 'Location', 'Language', 'Platform', 'Audience size', 'Engagement quality'],
  },
  {
    icon: Settings,
    title: 'Manage',
    intro: 'Launch campaigns with',
    items: ['Structured briefs', 'Creator invitations', 'Contracts', 'Content approvals', 'Campaign dashboards'],
  },
  {
    icon: BarChart3,
    title: 'Measure',
    intro: 'Track',
    items: ['Reach', 'Engagement', 'Clicks', 'Conversions', 'ROI'],
  },
  {
    icon: CreditCard,
    title: 'Pay',
    intro: 'Secure payments through',
    items: ['Escrow protection', 'Automated payouts', 'Invoice generation', 'Creator wallets'],
  },
];

export default function Solution() {
  return (
    <section id="solution" className="bg-[#F8F9FC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">Meet Whoosh</h2>
          <p className="mt-4 text-base leading-7 text-[#5B6170] lg:text-lg">
            Whoosh brings creators, brands, and agencies into one platform. From creator
            discovery to campaign reporting, everything happens in a single workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, intro, items }, index) => (
            <div
              key={title}
              className={`flex flex-col rounded-sm border border-[#D7DDF0] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md lg:p-6 ${
                index === 1 ? 'bg-[#091B68]' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    index === 1 ? 'bg-white/10' : 'bg-[#EEF0FF]'
                  }`}
                >
                  <Icon
                    size={20}
                    className={index === 1 ? 'text-[#A1B7FF]' : 'text-[#091B68]'}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      index === 1 ? 'text-white' : 'text-[#171A22]'
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-xs ${
                      index === 1 ? 'text-[#DDE3FF]/80' : 'text-[#5B6170]'
                    }`}
                  >
                    {intro}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      index === 1
                        ? 'bg-white/10 text-[#DDE3FF]'
                        : 'bg-[#EEF0FF] text-[#091B68]'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
