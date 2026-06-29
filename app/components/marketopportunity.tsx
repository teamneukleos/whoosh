const stats = [
  { value: '$17.84B', label: 'Projected African creator economy by 2030' },
  { value: '50M+', label: 'Nigerian social media users' },
  { value: '15.64%', label: 'Annual growth of influencer advertising in Nigeria' },
  { value: 'Thousands', label: 'Of micro-creators ready to work with brands' },
];

export default function MarketOpportunity() {
  return (
    <section className="bg-[#091B68] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Africa&apos;s Creator Economy Is Exploding
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-white/10 bg-white/5 px-6 py-8 text-center"
            >
              <p className="text-3xl font-bold text-[#A1B7FF] lg:text-4xl">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-[#DDE3FF] lg:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
