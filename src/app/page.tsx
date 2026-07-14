import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TheShift } from "@/components/sections/TheShift";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { StatsBand } from "@/components/sections/StatsBand";
import { DemoSection } from "@/components/sections/DemoSection";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ApplySection } from "@/components/sections/ApplySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TheShift />
        <HowItWorks />
        <UseCases />
        <StatsBand />
        <DemoSection />
        <CaseStudies />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
