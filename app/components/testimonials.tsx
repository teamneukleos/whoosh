const testimonials = [
  {
    quote:
      'Whoosh helped us discover creators we would never have found through traditional influencer marketing.',
    role: 'Brand Marketing Lead',
  },
  {
    quote:
      'The payment process was seamless and transparent from start to finish.',
    role: 'Creator',
  },
  {
    quote:
      'Campaign reporting finally gave us visibility into ROI.',
    role: 'Agency Partner',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F8F9FC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#171A22] lg:text-4xl">
            Trusted by Forward-Thinking Brands and Creators
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.role}
              className="rounded-sm border border-[#D7DDF0] bg-white p-6 lg:p-8"
            >
              <p className="text-base leading-8 text-[#5B6170]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold text-[#091B68]">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
