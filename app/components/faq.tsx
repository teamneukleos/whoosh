'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does Whoosh verify creators?',
    answer:
      'We use platform data, engagement analysis, and authenticity scoring to evaluate creator quality.',
  },
  {
    question: 'How do creators get paid?',
    answer:
      'Funds are held securely and released after approved deliverables, with payouts processed directly to creator bank accounts.',
  },
  {
    question: 'Can agencies use Whoosh?',
    answer:
      'Yes. Agencies can discover creators, manage campaigns, and report performance on behalf of clients.',
  },
  {
    question: 'Which platforms are supported?',
    answer:
      'Instagram, TikTok, and YouTube initially, with additional integrations planned.',
  },
  {
    question: 'Is Whoosh available outside Nigeria?',
    answer:
      'Nigeria is our launch market, with expansion planned across Africa.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">FAQ</h2>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-sm border border-[#D7DDF0] bg-[#F8F9FC]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#171A22]">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#091B68] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#D7DDF0] px-5 py-4">
                    <p className="text-sm leading-7 text-[#5B6170] lg:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
