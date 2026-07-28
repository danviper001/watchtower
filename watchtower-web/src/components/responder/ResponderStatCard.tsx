import Card from "../ui/Card";

interface Props {
  title: string;
  value: number;
  color: string;
}

export default function ResponderStatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1">
      <h3 className="text-gray-400 text-sm">{title}</h3>

      <h1 className={`mt-3 text-4xl font-black ${color}`}>
        {value}
      </h1>
    </Card>
  );
}