import { motion } from "framer-motion";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 12,
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/40"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            bottom: "-20px",
          }}
          animate={{
            y: ["0vh", "-120vh"],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}