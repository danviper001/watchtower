import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050505]">

      {/* Main Glow */}

      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 120, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/3 top-1/3 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[170px]"
      />

      <motion.div
        animate={{
          x: [0, -220, 120, 0],
          y: [0, 180, -120, 0],
          scale: [1.2, 0.9, 1.2],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-blue-600/10 blur-[180px]"
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Noise */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
    </div>
  );
}