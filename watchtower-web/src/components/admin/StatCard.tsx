import AnimatedNumber from "./AnimatedNumber";
import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  color,
  icon,
}: Props) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-slate-900/70
      p-7
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-cyan-400/50
      hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
    "
    >
      <div
        className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl opacity-20 ${color}`}
      />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-black text-white">
  <AnimatedNumber value={value} />
</h2>

        </div>

        <div
          className={`text-5xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}