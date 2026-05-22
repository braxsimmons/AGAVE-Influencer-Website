import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TheShift } from "@/components/sections/TheShift";
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
        <TheShift />
        <HowItWorks />
        <DemoSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
