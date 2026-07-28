import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import IncidentDetailsModal from "../components/admin/IncidentDetailsModal";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import ResponderStatCard from "../components/responder/ResponderStatCard";
import {
  getAssignedIncidents,
  acceptIncident,
  markOnTheWay,
  markArrived,
  resolveIncident,
} from "../api/responderApi";
import type { Incident } from "../types/incident";
import ResponderMap from "../components/responder/ResponderMap";
import socket from "../socket";
import { formatDistanceToNow } from "date-fns";


export default function ResponderDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] =
  useState<Incident | null>(null);
  const assignedCount = incidents.filter(
  (i) => i.status === "Responder Assigned"
).length;

const acceptedCount = incidents.filter(
  (i) => i.status === "Accepted"
).length;

const onTheWayCount = incidents.filter(
  (i) => i.status === "On The Way"
).length;

const resolvedCount = incidents.filter(
  (i) => i.status === "Resolved"
).length;

  useEffect(() => {
    loadIncidents();

    socket.on("incidentAssigned", loadIncidents);
    socket.on("incidentAccepted", loadIncidents);
    socket.on("incidentOnTheWay", loadIncidents);
    socket.on("incidentArrived", loadIncidents);
    socket.on("incidentResolved", loadIncidents);

    return () => {
      socket.off("incidentAssigned");
      socket.off("incidentAccepted");
      socket.off("incidentOnTheWay");
      socket.off("incidentArrived");
      socket.off("incidentResolved");
    };
  }, []);

  async function loadIncidents() {
    try {
      const res = await getAssignedIncidents();
      setIncidents(res.data);
    } catch {
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }


  

  async function handleOnTheWay(id: string) {
  try {
    await markOnTheWay(id);

    toast.success("Heading to incident");

    loadIncidents();
  } catch (error) {
    console.error(error);

    toast.error("Failed to update status");
  }
}

  async function handleArrived(id: string) {
  try {
    await markArrived(id);

    toast.success("Responder Arrived");

    loadIncidents();
  } catch (error) {
    console.error(error);

    toast.error("Failed to update status");
  }
}

async function handleResolve(id: string) {
  try {
    await resolveIncident(id);

    toast.success("Incident Resolved");

    loadIncidents();
  } catch (error) {
    console.error(error);

    toast.error("Failed to resolve incident");
  }
}

  async function handleAccept(id: string) {
  try {
    await acceptIncident(id);

    toast.success("Incident Accepted");

    loadIncidents();
  } catch (error) {
    console.error(error);

    toast.error("Unable to accept incident");
  }
}

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black text-white">
            Responder Dashboard
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  <ResponderStatCard
    title="Assigned"
    value={assignedCount}
    color="text-yellow-400"
  />

  <ResponderStatCard
    title="Accepted"
    value={acceptedCount}
    color="text-cyan-400"
  />

  <ResponderStatCard
    title="On The Way"
    value={onTheWayCount}
    color="text-orange-400"
  />

  <ResponderStatCard
    title="Resolved"
    value={resolvedCount}
    color="text-green-400"
  />
</div>

<Card className="mt-8">

  <ResponderMap
    incidents={incidents}
  />

</Card>

          <p className="mt-3 text-gray-400">
            Manage your assigned emergency incidents.
          </p>

          <Card className="mt-10 overflow-x-auto">

            {loading ? (
              <div className="py-12 text-center text-white">
                Loading...
              </div>
            ) : (
              <table className="w-full">

                <thead>

                  <tr className="border-b border-white/10">

                    <th className="p-4 text-left">Incident</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Severity</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>

                  </tr>

                </thead>

                <tbody>

  {incidents.length === 0 ? (

    <tr>

      <td
        colSpan={5}
        className="p-10 text-center text-gray-400"
      >
        No assigned incidents.
      </td>

    </tr>

  ) : (

    incidents.map((incident) => (

                    <tr
                      key={incident._id}
                      className="border-b border-white/5"
                    >

                      <td className="p-4">
  <p className="font-semibold text-white">
    {incident.title}
  </p>

  <p className="mt-1 text-xs text-red-400">
    ⏱{" "}
    {formatDistanceToNow(
      new Date(incident.createdAt),
      {
        addSuffix: true,
      }
    )}
  </p>
</td>

                      <td className="p-4">
                        {incident.category}
                      </td>

                      <td className="p-4">
                        {incident.severity}
                      </td>

                      <td className="p-4">

<span
className={`rounded-full px-4 py-2 text-sm font-semibold

${
incident.status === "Responder Assigned"
? "bg-yellow-500/20 text-yellow-300"

: incident.status === "Accepted"
? "bg-cyan-500/20 text-cyan-300"

: incident.status === "On The Way"
? "bg-orange-500/20 text-orange-300"

: incident.status === "Arrived"
? "bg-blue-500/20 text-blue-300"

: "bg-green-500/20 text-green-300"
}
`}
>
{incident.status}
</span>

</td>

                      <td className="p-4 flex flex-wrap gap-2">
                        <Button
  className="bg-indigo-600"
  onClick={() =>
    window.open(
      `https://www.google.com/maps?q=${incident.location.latitude},${incident.location.longitude}`,
      "_blank"
    )
  }
>
  Navigate
</Button>

  <Button
    className="bg-slate-700"
    onClick={() => setSelectedIncident(incident)}
  >
    View
  </Button>

  {incident.status === "Responder Assigned" && (
    <Button
      className="bg-cyan-600"
      onClick={() => handleAccept(incident._id)}
    >
      Accept
    </Button>
  )}

  {incident.status === "Accepted" && (
    <Button
      className="bg-yellow-600"
      onClick={() => handleOnTheWay(incident._id)}
    >
      On The Way
    </Button>
  )}

  {incident.status === "On The Way" && (
    <Button
      className="bg-orange-600"
      onClick={() => handleArrived(incident._id)}
    >
      Arrived
    </Button>
  )}

  {incident.status === "Arrived" && (
    <Button
  className="bg-green-600"
  onClick={() => {
    if (
      window.confirm(
        "Are you sure you want to mark this incident as resolved?"
      )
    ) {
      handleResolve(incident._id);
    }
  }}
>
  Resolve
</Button>
  )}

  {incident.status === "Resolved" && (
    <span className="font-bold text-green-400">
      Completed
    </span>
  )}

</td>

                    </tr>

                  ))
)}

                </tbody>

              </table>
            )}

          </Card>

        </Container>
      </main>
      <IncidentDetailsModal
  incident={selectedIncident}
  onClose={() => setSelectedIncident(null)}
/>
    </>
  );
}