import AuroraBackground from "../components/animations/AuroraBackground";
import FloatingParticles from "../components/animations/FloatingParticles";
import Reveal from "../components/animations/Reveal";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Hero from "../components/hero/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import MouseGlow from "../components/animations/MouseGlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">
      <AnimatedBackground />
      <AuroraBackground />
      <FloatingParticles />
      <MouseGlow />

      <Navbar />

      <main className="pt-20">

        <Reveal>
          <Hero />
        </Reveal>

        <Reveal delay={0.2}>
          <Stats />
        </Reveal>

        <Reveal delay={0.3}>
          <Features />
        </Reveal>

        <Reveal delay={0.4}>
          <HowItWorks />
        </Reveal>

      </main>

      <Reveal delay={0.5}>
        <Footer />
      </Reveal>

    </div>
  );
}