import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">

      {/* Glow 1 */}

      <motion.div
        animate={{
          x: [0, 250, -120, 0],
          y: [0, -180, 100, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/20
          blur-[140px]
        "
      />

      {/* Glow 2 */}

      <motion.div
        animate={{
          x: [0, -220, 100, 0],
          y: [0, 180, -100, 0],
          scale: [1, 0.9, 1.4, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          right-0
          bottom-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue-600/20
          blur-[150px]
        "
      />

    </div>
  );
}