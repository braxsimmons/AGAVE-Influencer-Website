import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ValueMarquee } from "@/components/sections/ValueMarquee";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DemoSection } from "@/components/sections/DemoSection";
import { ApplySection } from "@/components/sections/ApplySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueMarquee />
        <HowItWorks />
        <DemoSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
