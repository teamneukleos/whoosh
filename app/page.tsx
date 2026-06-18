import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FeatureCards from "./components/featurecards";
import HowItWorks from "./components/howitworks";
import CTA from "./components/cta";

export default function HomePage() {
  return (
    <main className="">
      <Navbar />
        <Hero />
        <FeatureCards />
        <HowItWorks />
        <CTA />
    </main>
        
  );
}