import { Shield, MapPinned, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

              <Shield size={18} />

              Smart Emergency Response Platform

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">

              Safer
              <br />

              Communities
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Start Here.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">

              WatchTower helps citizens report emergencies,
              enables responders to react faster and allows
              administrators to monitor incidents across the city
              in real time.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">

                Report Incident

              </Button>

              <Button className="border border-white/10 bg-white/5 text-white hover:bg-white/10">

                <MapPinned size={18} />

                <span className="mx-2">
                  Live Map
                </span>

                <ArrowRight size={18} />

              </Button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-slate-900/70 p-10">

                <div className="flex flex-col items-center justify-center py-24">

                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20">

                    <MapPinned
                      size={42}
                      className="text-cyan-400"
                    />

                  </div>

                  <h2 className="text-3xl font-bold">

                    Live Incident Map

                  </h2>

                  <p className="mt-4 max-w-sm text-center leading-7 text-gray-400">

                    Interactive emergency monitoring with
                    real-time reports, responder tracking and
                    GPS incident locations.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}