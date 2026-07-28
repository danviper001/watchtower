import {
  TriangleAlert,
  MapPinned,
  Bell,
  ShieldCheck,
  BarChart3,
  Smartphone,
} from "lucide-react";

import Container from "../ui/Container";
import Card from "../ui/Card";

const features = [
  {
    icon: TriangleAlert,
    title: "Report Emergencies",
    description:
      "Report crimes, fires, accidents, floods and medical emergencies within seconds.",
    color: "text-red-400",
  },
  {
    icon: MapPinned,
    title: "GPS Location",
    description:
      "Automatically capture the incident location for faster emergency response.",
    color: "text-cyan-400",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Receive live updates whenever your incident is verified or resolved.",
    color: "text-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "Responder Dispatch",
    description:
      "Emergency responders receive verified incidents immediately.",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Administrators monitor trends, reports and emergency statistics in real time.",
    color: "text-purple-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Use WatchTower on desktop, tablet or smartphone anywhere, anytime.",
    color: "text-pink-400",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <Container>

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <h2 className="text-4xl font-black md:text-5xl">
            Powerful Features
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Everything your community needs to report, monitor
            and respond to emergencies efficiently.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ${feature.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-8 text-gray-400">
                  {feature.description}
                </p>
              </Card>
            );
          })}

        </div>

      </Container>
    </section>
  );
}