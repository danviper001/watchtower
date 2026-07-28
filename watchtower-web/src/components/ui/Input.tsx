import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`w-full h-14 rounded-xl border border-white/10 bg-slate-900/60 px-5 outline-none ${className}`}
    />
  );
}