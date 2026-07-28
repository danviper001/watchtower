import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Shield,
  User,
  X,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import type { Incident } from "../../types/incident";

interface Props {
  incident: Incident | null;
  onClose: () => void;
}

export default function IncidentDetailsModal({
  incident,
  onClose,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!incident) return null;

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >

        <div
          className="flex min-h-screen items-center justify-center p-6"
          onClick={(e) => e.stopPropagation()}
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.35,
            }}
            className="w-full max-w-6xl"
          >

            <Card className="max-h-[90vh] overflow-y-auto border border-cyan-500/20 bg-slate-900/90 backdrop-blur-xl">

              {/* HEADER */}

              <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-900/95 p-6 backdrop-blur-xl">

                <div className="flex items-center gap-5">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20">

                    <AlertTriangle
                      size={34}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <h2 className="text-3xl font-black text-white">
                      Incident Details
                    </h2>

                    <p className="text-gray-400">
                      Emergency Command Center
                    </p>

                  </div>

                </div>

                <Button
                  onClick={onClose}
                  className="h-12 w-12 rounded-full bg-red-600 p-0 hover:bg-red-700"
                >
                  <X />
                </Button>

              </div>

              <div className="space-y-10 p-8">

                {/* HERO */}

                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h1 className="text-5xl font-black text-white">
                      {incident.title}
                    </h1>

                    <div className="mt-5 flex items-center gap-3 text-gray-400">

                      <Clock size={18} />

                      {new Date(
                        incident.createdAt
                      ).toLocaleString()}

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-4">

                    <span
                      className={`rounded-full px-6 py-3 font-bold ${
                        incident.severity === "Critical"
                          ? "bg-red-500/20 text-red-400"

                          : incident.severity === "High"
                          ? "bg-orange-500/20 text-orange-300"

                          : incident.severity === "Medium"
                          ? "bg-yellow-500/20 text-yellow-300"

                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {incident.severity}
                    </span>

                    <span className="rounded-full bg-cyan-500/20 px-6 py-3 font-bold text-cyan-300">
                      {incident.status}
                    </span>

                  </div>

                </div>

                {/* INFORMATION */}

                <div className="grid gap-8 lg:grid-cols-2">

                  <Card>

                    <div className="flex items-center gap-3">

                      <User className="text-cyan-400" />

                      <h3 className="text-xl font-bold">
                        Reporter
                      </h3>

                    </div>

                    <div className="mt-6 space-y-4">

                      <div>

                        <p className="text-sm text-gray-400">
                          Name
                        </p>

                        <p className="font-semibold text-white">
                          {incident.reportedBy?.fullName}
                        </p>

                      </div>

                      <div>

                        <p className="text-sm text-gray-400">
                          Email
                        </p>

                        <p className="text-white">
                          {incident.reportedBy?.email}
                        </p>

                      </div>

                    </div>

                  </Card>

                  <Card>

                    <div className="flex items-center gap-3">

                      <Shield className="text-cyan-400" />

                      <h3 className="text-xl font-bold">
                        Incident Info
                      </h3>

                    </div>

                    <div className="mt-6 space-y-4">

                      <div>

                        <p className="text-sm text-gray-400">
                          Category
                        </p>

                        <p className="text-white">
                          {incident.category}
                        </p>

                      </div>

                      <div>

                        <p className="text-sm text-gray-400">
                          Address
                        </p>

                        <div className="flex items-start gap-2">

                          <MapPin
                            size={18}
                            className="mt-1 text-cyan-400"
                          />

                          <p className="text-white">
                            {incident.location.address}
                          </p>

                        </div>

                      </div>

                    </div>

                  </Card>

                </div>

                {/* DESCRIPTION */}

                <Card>

                  <h3 className="text-2xl font-bold text-white">
                    Description
                  </h3>

                  <p className="mt-5 whitespace-pre-wrap leading-8 text-gray-300">
                    {incident.description}
                  </p>

                </Card>
                                {/* IMAGES */}

                {incident.images && incident.images.length > 0 && (

                  <Card>

                    <h3 className="text-2xl font-bold text-white">
                      Evidence
                    </h3>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                      {incident.images.map((image, index) => (

                        <motion.img
                          key={index}
                          whileHover={{
                            scale: 1.03,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          src={image.url}
                          alt={`Evidence ${index + 1}`}
                          className="h-72 w-full rounded-2xl border border-white/10 object-cover shadow-xl"
                        />

                      ))}

                    </div>

                  </Card>

                )}

                {/* MAP */}

                <Card>

                  <h3 className="text-2xl font-bold text-white">
                    Incident Location
                  </h3>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

                    <iframe
                      title="Incident Map"
                      width="100%"
                      height="420"
                      loading="lazy"
                      className="border-0"
                      src={`https://maps.google.com/maps?q=${incident.location.latitude},${incident.location.longitude}&z=15&output=embed`}
                    />

                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">

                    <div>

                      <p className="text-sm text-gray-400">
                        Latitude
                      </p>

                      <p className="text-white">
                        {incident.location.latitude}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-400">
                        Longitude
                      </p>

                      <p className="text-white">
                        {incident.location.longitude}
                      </p>

                    </div>

                  </div>

                </Card>

                {/* TIMELINE */}

                <Card>

                  <h3 className="text-2xl font-bold text-white">
                    Incident Timeline
                  </h3>

                  <div className="relative mt-8 border-l-2 border-cyan-500/30 pl-8">

                    {incident.timeline?.length ? (

                      incident.timeline.map((item, index) => (

                        <motion.div
                          key={index}
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.08,
                          }}
                          className="relative mb-10"
                        >

                          <span className="absolute -left-[42px] top-2 h-5 w-5 rounded-full border-4 border-slate-900 bg-cyan-400" />

                          <h4 className="text-lg font-bold text-cyan-300">

                            {item.status}

                          </h4>

                          <p className="mt-2 text-sm text-gray-400">

                            {new Date(
                              item.updatedAt
                            ).toLocaleString()}

                          </p>

                        </motion.div>

                      ))

                    ) : (

                      <p className="text-gray-400">

                        No timeline available.

                      </p>

                    )}

                  </div>

                </Card>

                {/* RESPONSE INFORMATION */}

                <div className="grid gap-6 lg:grid-cols-2">

                  <Card>

                    <h3 className="text-2xl font-bold text-white">
                      Assigned Responder
                    </h3>

                    {incident.assignedResponder ? (

                      <div className="mt-6 space-y-4">

                        <div>

                          <p className="text-sm text-gray-400">
                            Name
                          </p>

                          <p className="text-white">
                            {incident.assignedResponder.fullName}
                          </p>

                        </div>

                        <div>

                          <p className="text-sm text-gray-400">
                            Email
                          </p>

                          <p className="text-white">
                            {incident.assignedResponder.email}
                          </p>

                        </div>

                      </div>

                    ) : (

                      <div className="mt-6 rounded-xl bg-yellow-500/10 p-5 text-yellow-300">

                        No responder assigned yet.

                      </div>

                    )}

                  </Card>

                  <Card>

                    <h3 className="text-2xl font-bold text-white">
                      Verified By
                    </h3>

                    {incident.verifiedBy ? (

                      <div className="mt-6 space-y-4">

                        <div>

                          <p className="text-sm text-gray-400">
                            Name
                          </p>

                          <p className="text-white">
                            {incident.verifiedBy.fullName}
                          </p>

                        </div>

                        <div>

                          <p className="text-sm text-gray-400">
                            Email
                          </p>

                          <p className="text-white">
                            {incident.verifiedBy.email}
                          </p>

                        </div>

                      </div>

                    ) : (

                      <div className="mt-6 rounded-xl bg-red-500/10 p-5 text-red-300">

                        Incident has not been verified.

                      </div>

                    )}

                  </Card>

                </div>
                                {/* FOOTER */}

                <div className="mt-10 flex flex-wrap justify-end gap-4 border-t border-white/10 pt-8">

                  <Button
                    onClick={onClose}
                    className="bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Close
                  </Button>

                </div>

              </div>

            </Card>

          </motion.div>

        </div>

      </motion.div>

    </AnimatePresence>

  );
}