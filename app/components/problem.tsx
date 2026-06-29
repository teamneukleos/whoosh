import { Building2, User } from 'lucide-react';

const brandProblems = [
  'Finding quality creators takes too much time',
  'Fake followers and engagement are difficult to detect',
  'Campaign management happens across DMs, WhatsApp, spreadsheets, and emails',
  'Performance measurement is inconsistent',
];

const creatorProblems = [
  'Brand opportunities are hard to find',
  'Payments are often delayed or disputed',
  'No professional portfolio infrastructure',
  'Every deal starts from scratch',
];

export default function Problem() {
  return (
    <section id="problem" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">
            The Creator Economy Is Growing. The Process Is Broken.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5B6170] lg:text-lg">
            Brands struggle to discover trustworthy creators, while creators struggle to
            access reliable opportunities and timely payments.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-sm border border-[#D7DDF0] bg-[#F8F9FC] p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#091B68]">
                <Building2 size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#171A22]">For Brands</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {brandProblems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#5B6170] lg:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#091B68]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-[#D7DDF0] bg-[#F8F9FC] p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D4EFF]">
                <User size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#171A22]">For Creators</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {creatorProblems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#5B6170] lg:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4EFF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
