interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/5
        bg-[#0d0d0d]/85
        backdrop-blur-3xl
        p-8
        shadow-[0_0_40px_rgba(0,255,255,0.05)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-cyan-400/30
        hover:shadow-[0_0_60px_rgba(6,182,212,0.18)]
        ${className}
      `}
    >
      {/* Cyan Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

      {/* Top Shine */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}