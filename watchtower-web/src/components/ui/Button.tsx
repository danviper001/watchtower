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
      className={`inline-flex items-center justify-center h-14 px-8 rounded-xl font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}