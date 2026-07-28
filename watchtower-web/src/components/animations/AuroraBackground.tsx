import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050816]">

      <motion.div
        className="absolute left-[-200px] top-[-150px] h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[140px]"
        animate={{
          x: [0, 120, -60, 0],
          y: [0, 80, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[-250px] top-[100px] h-[650px] w-[650px] rounded-full bg-blue-500/15 blur-[170px]"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-220px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[180px]"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}