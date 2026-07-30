import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        group
        relative
        inline-flex
        h-14
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-cyan-500/20
        bg-gradient-to-r
        from-cyan-500
        via-sky-500
        to-blue-600
        px-8
        font-semibold
        text-white
        shadow-lg
        shadow-cyan-500/20
        transition-all
        duration-300

        hover:scale-105
        hover:shadow-2xl
        hover:shadow-cyan-500/40

        active:scale-95

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
    >
      {/* Shine Effect */}

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}