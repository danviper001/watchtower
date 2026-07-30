import { motion } from "framer-motion";

const particles = Array.from({ length: 35 });

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030303]">

      {/* Large Cyan Glow */}

      <motion.div
        animate={{
          x: [0, 250, -120, 0],
          y: [0, -180, 150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]"
      />

      {/* Blue Glow */}

      <motion.div
        animate={{
          x: [0, -220, 120, 0],
          y: [0, 180, -100, 0],
          scale: [1.2, 0.9, 1.2],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-blue-600/10 blur-[180px]"
      />

      {/* Purple Accent */}

      <motion.div
        animate={{
          x: [0, -150, 120, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[160px]"
      />

      {/* Animated Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Floating Particles */}

      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400"

          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}

          animate={{
            y: [-40, 40, -40],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}

          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Vignette */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_90%)]" />
    </div>
  );
}