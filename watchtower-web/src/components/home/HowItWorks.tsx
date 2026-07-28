import {
  TriangleAlert,
  ClipboardCheck,
  Ambulance,
  ShieldCheck,
} from "lucide-react";

import Container from "../ui/Container";
import Card from "../ui/Card";

const steps = [
  {
    number: "01",
    title: "Report Incident",
    description:
      "A citizen reports an emergency by providing the incident details, location and images.",
    icon: TriangleAlert,
    color: "text-red-400",
  },
  {
    number: "02",
    title: "Admin Verification",
    description:
      "Administrators review the report to confirm its authenticity before dispatch.",
    icon: ClipboardCheck,
    color: "text-cyan-400",
  },
  {
    number: "03",
    title: "Responder Assigned",
    description:
      "The nearest emergency responder receives the incident and begins responding.",
    icon: Ambulance,
    color: "text-yellow-400",
  },
  {
    number: "04",
    title: "Incident Resolved",
    description:
      "The responder updates the incident status, and the reporter is notified.",
    icon: ShieldCheck,
    color: "text-green-400",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <Container>

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <h2 className="text-4xl font-black md:text-5xl">
            How WatchTower Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Reporting emergencies is simple. WatchTower connects
            citizens, administrators and responders in just four steps.
          </p>

        </div>

        {/* Timeline */}

        <div className="grid gap-8 lg:grid-cols-4">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                className="relative text-center"
              >

                <div className="absolute left-6 top-6 text-6xl font-black text-white/5">
                  {step.number}
                </div>

                <div
                  className={`mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ${step.color}`}
                >
                  <Icon size={38} />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="leading-8 text-gray-400">
                  {step.description}
                </p>

              </Card>
            );
          })}

        </div>

      </Container>
    </section>
  );
}