import {
  Users,
  TriangleAlert,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import Container from "../ui/Container";
import Card from "../ui/Card";

const stats = [
  {
    title: "Registered Users",
    value: "1,280+",
    icon: Users,
    color: "text-cyan-400",
  },
  {
    title: "Incidents Reported",
    value: "450+",
    icon: TriangleAlert,
    color: "text-red-400",
  },
  {
    title: "Resolved Cases",
    value: "320+",
    icon: ShieldCheck,
    color: "text-green-400",
  },
  {
    title: "Average Response",
    value: "8 mins",
    icon: Clock3,
    color: "text-yellow-400",
  },
];

export default function Stats() {
  return (
    <section className="py-24">
      <Container>

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-black md:text-5xl">
            Community Impact
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            WatchTower helps communities respond faster by connecting
            citizens, responders and administrators in one platform.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="text-center"
              >
                <div
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ${stat.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="text-4xl font-black">
                  {stat.value}
                </h3>

                <p className="mt-3 text-gray-400">
                  {stat.title}
                </p>
              </Card>
            );
          })}

        </div>

      </Container>
    </section>
  );
}