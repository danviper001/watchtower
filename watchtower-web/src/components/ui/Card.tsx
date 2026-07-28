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
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-400/40
        hover:shadow-cyan-500/10
        ${className}
      `}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}