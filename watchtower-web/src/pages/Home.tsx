import AuroraBackground from "../components/animations/AuroraBackground";
import FloatingParticles from "../components/animations/FloatingParticles";
import MouseGlow from "../components/animations/MouseGlow";
import Reveal from "../components/animations/Reveal";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AnimatedBackground from "../components/ui/AnimatedBackground";

import Hero from "../components/hero/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <AnimatedBackground />
      <AuroraBackground />
      <FloatingParticles />
      <MouseGlow />

      <Navbar />

      <main className="pt-20">

        {/* HERO */}
        <section id="home">
          <Reveal>
            <Hero />
          </Reveal>
        </section>

        {/* STATISTICS */}
        <section id="stats">
          <Reveal delay={0.2}>
            <Stats />
          </Reveal>
        </section>

        {/* FEATURES */}
        <section id="features">
          <Reveal delay={0.3}>
            <Features />
          </Reveal>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works">
          <Reveal delay={0.4}>
            <HowItWorks />
          </Reveal>
        </section>

      </main>

      {/* CONTACT */}
      <section id="contact">
        <Reveal delay={0.5}>
          <Footer />
        </Reveal>
      </section>
    </div>
  );
}