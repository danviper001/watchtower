import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  pending: number;
  verified: number;
  resolved: number;
}

export default function IncidentStatusChart({
  pending,
  verified,
  resolved,
}: Props) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Verified",
      value: verified,
    },
    {
      name: "Resolved",
      value: resolved,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Incident Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            fill="#06b6d4"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}