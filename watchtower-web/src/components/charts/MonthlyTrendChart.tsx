import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    _id: {
      year: number;
      month: number;
    };
    reports: number;
  }[];
}

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyTrendChart({
  data,
}: Props) {
  const chartData = data.map((item) => ({
    month: `${months[item._id.month]} ${item._id.year}`,
    reports: item.reports,
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Monthly Incident Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="reports"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}