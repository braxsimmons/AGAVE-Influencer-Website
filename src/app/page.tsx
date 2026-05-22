import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { TheShift } from "@/components/sections/TheShift";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsBand } from "@/components/sections/StatsBand";
import { DemoSection } from "@/components/sections/DemoSection";
import { ApplySection } from "@/components/sections/ApplySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Partners />
        <TheShift />
        <HowItWorks />
        <StatsBand />
        <DemoSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
