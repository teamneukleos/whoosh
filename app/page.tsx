import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Problem from "./components/problem";
import Solution from "./components/solution";
import HowItWorks from "./components/howitworks";
import CreatorSection from "./components/creatorsection";
import FeatureCards from "./components/featurecards";
import WhyKreate from "./components/whykreate";
import Testimonials from "./components/testimonials";
import MarketOpportunity from "./components/marketopportunity";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <CreatorSection />
      <FeatureCards />
      <WhyKreate />
      <Testimonials />
      <MarketOpportunity />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
