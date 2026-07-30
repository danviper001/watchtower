import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socket from "../socket";

import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AnimatedBackground from "../components/ui/AnimatedBackground";

import IncidentDetailsModal from "../components/admin/IncidentDetailsModal";
import AssignResponderModal from "../components/admin/AssignResponderModal";

import {
  getAllIncidentsAdmin,
  verifyIncident,
  resolveIncident,
} from "../api/adminApi";

import type { Incident } from "../types/incident";

export default function AdminIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedIncident, setSelectedIncident] =
    useState<Incident | null>(null);

  const [assignOpen, setAssignOpen] = useState(false);

  const [selectedIncidentId, setSelectedIncidentId] =
    useState("");

  useEffect(() => {
    loadIncidents();

    socket.on("incidentCreated", () => {
      loadIncidents();
      toast.success("🚨 New Incident Received");
    });

    socket.on("incidentVerified", loadIncidents);
    socket.on("incidentResolved", loadIncidents);

    return () => {
      socket.off("incidentCreated");
      socket.off("incidentVerified");
      socket.off("incidentResolved");
    };
  }, []);

  async function loadIncidents() {
    try {
      const res = await getAllIncidentsAdmin();

      setIncidents(res.data.incidents);
    } catch {
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(id: string) {
    try {
      await verifyIncident(id);

      toast.success("Incident verified");

      loadIncidents();
    } catch {
      toast.error("Verification failed");
    }
  }

  async function handleResolve(id: string) {
    try {
      await resolveIncident(id);

      toast.success("Incident resolved");

      loadIncidents();
    } catch {
      toast.error("Resolve failed");
    }
  }

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      incident.reportedBy?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      incident.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalIncidents = incidents.length;

  const pendingIncidents = incidents.filter(
    (i) => i.status === "Pending"
  ).length;

  const verifiedIncidents = incidents.filter(
    (i) => i.status === "Verified"
  ).length;

  const resolvedIncidents = incidents.filter(
    (i) => i.status === "Resolved"
  ).length;

  return (
    <>
      <AnimatedBackground />

      <Navbar />

      <main className="min-h-screen bg-transparent pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black text-white">
            Manage Incidents
          </h1>

          <p className="mt-3 text-gray-400">
            Verify, assign and resolve reported incidents.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <input
              type="text"
              placeholder="Search incidents..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-white outline-none md:w-96"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-white outline-none"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>

          </div>
                    {/* ================= Statistics ================= */}

          <div className="mt-10 grid gap-6 lg:grid-cols-4">

            <Card className="border-red-500/20 bg-gradient-to-br from-red-600/20 to-red-900/20">
              <p className="text-gray-400">
                Total Incidents
              </p>

              <h2 className="mt-4 text-5xl font-black text-white">
                {totalIncidents}
              </h2>
            </Card>

            <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/20 to-yellow-900/20">
              <p className="text-gray-400">
                Pending
              </p>

              <h2 className="mt-4 text-5xl font-black text-yellow-300">
                {pendingIncidents}
              </h2>
            </Card>

            <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-600/20 to-blue-900/20">
              <p className="text-gray-400">
                Verified
              </p>

              <h2 className="mt-4 text-5xl font-black text-cyan-300">
                {verifiedIncidents}
              </h2>
            </Card>

            <Card className="border-green-500/20 bg-gradient-to-br from-green-600/20 to-green-900/20">
              <p className="text-gray-400">
                Resolved
              </p>

              <h2 className="mt-4 text-5xl font-black text-green-300">
                {resolvedIncidents}
              </h2>
            </Card>

          </div>

          {/* ================= Incidents Table ================= */}

          <Card className="mt-10 overflow-hidden">

            {loading ? (

              <div className="py-20 text-center text-white">
                Loading incidents...
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-white/10 bg-slate-900">

                      <th className="p-5 text-left text-gray-300">
                        Title
                      </th>

                      <th className="p-5 text-left text-gray-300">
                        Reporter
                      </th>

                      <th className="p-5 text-left text-gray-300">
                        Category
                      </th>

                      <th className="p-5 text-left text-gray-300">
                        Severity
                      </th>

                      <th className="p-5 text-left text-gray-300">
                        Status
                      </th>

                      <th className="p-5 text-left text-gray-300">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredIncidents.map((incident) => (

                      <tr
                        key={incident._id}
                        className="border-b border-white/5 transition hover:bg-slate-900/60"
                      >

                        <td className="p-5 font-semibold text-white">
                          {incident.title}
                        </td>

                        <td className="p-5 text-gray-300">
                          {incident.reportedBy?.fullName}
                        </td>

                        <td className="p-5 text-gray-300">
                          {incident.category}
                        </td>

                        <td className="p-5">

                          <span
                            className={`font-bold

                            ${
                              incident.severity === "Critical"
                                ? "text-red-500"

                              : incident.severity === "High"
                                ? "text-orange-400"

                              : incident.severity === "Medium"
                                ? "text-yellow-300"

                              : "text-green-400"
                            }
                            `}
                          >
                            {incident.severity}
                          </span>

                        </td>

                        <td className="p-5">

                          <span
                            className={`rounded-full px-4 py-2 text-sm font-semibold

                            ${
                              incident.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-300"

                              : incident.status === "Verified"
                                ? "bg-cyan-500/20 text-cyan-300"

                              : incident.status === "Resolved"
                                ? "bg-green-500/20 text-green-300"

                              : "bg-red-500/20 text-red-300"
                            }
                            `}
                          >
                            {incident.status}
                          </span>

                        </td>

                        <td className="p-5">

                          <div className="flex flex-wrap gap-2">

                            <Button
                              className="bg-cyan-600 text-white"
                              onClick={() =>
                                setSelectedIncident(incident)
                              }
                            >
                              View
                            </Button>

                            <Button
                              className="bg-blue-600 text-white"
                              onClick={() =>
                                handleVerify(incident._id)
                              }
                            >
                              Verify
                            </Button>

                            <Button
                              className="bg-purple-600 text-white"
                              onClick={() => {
                                setSelectedIncidentId(
                                  incident._id
                                );
                                setAssignOpen(true);
                              }}
                            >
                              Assign
                            </Button>

                            <Button
                              className="bg-green-600 text-white"
                              onClick={() =>
                                handleResolve(
                                  incident._id
                                )
                              }
                            >
                              Resolve
                            </Button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </Card>
                  </Container>
      </main>

      <IncidentDetailsModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      <AssignResponderModal
        open={assignOpen}
        incidentId={selectedIncidentId}
        onClose={() => setAssignOpen(false)}
        onAssigned={() => {
          loadIncidents();
          setAssignOpen(false);
          toast.success("Responder assigned successfully");
        }}
      />
    </>
  );
}