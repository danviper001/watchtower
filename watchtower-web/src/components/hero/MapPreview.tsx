import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const incidents = [
  {
    city: "Lagos",
    status: "High Activity",
    color: "bg-red-500",
  },
  {
    city: "Abuja",
    status: "Moderate",
    color: "bg-yellow-400",
  },
  {
    city: "Port Harcourt",
    status: "Low",
    color: "bg-green-500",
  },
  {
    city: "Kano",
    status: "Monitoring",
    color: "bg-blue-500",
  },
];

function MapPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .5 }}
      className="relative"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Live Incident Monitor
        </h2>

        <div className="relative h-[420px] rounded-2xl bg-slate-900 overflow-hidden">

          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          {incidents.map((incident, index) => (
            <motion.div
              key={incident.city}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: index * .4,
              }}
              className="absolute"
              style={{
                top: `${20 + index * 22}%`,
                left: `${25 + index * 15}%`,
              }}
            >
              <MapPin
                className="text-cyan-400"
                size={28}
              />

              <div className="mt-1 flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm">

                <div
                  className={`h-2 w-2 rounded-full ${incident.color}`}
                />

                {incident.city}

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </motion.div>
  );
}

export default MapPreview;