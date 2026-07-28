import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import AdminIncidentMap from "../components/admin/AdminIncidentMap";
import { getIncidentMap } from "../api/mapApi";
import socket from "../socket";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";

interface Incident {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  reportedBy?: {
    fullName: string;
    email: string;
  };
}

export default function AdminMap() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filtered, setFiltered] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
  loadMap();

  socket.on("incidentCreated", () => {
    loadMap();

    toast.success("🚨 Map Updated");
  });

  socket.on("incidentVerified", loadMap);

  socket.on("incidentResolved", loadMap);

  return () => {
    socket.off("incidentCreated");
    socket.off("incidentVerified");
    socket.off("incidentResolved");
  };
}, []);

  useEffect(() => {
    let data = incidents;

    if (statusFilter !== "All") {
      data = data.filter(
        (incident) => incident.status === statusFilter
      );
    }

    if (categoryFilter !== "All") {
      data = data.filter(
        (incident) => incident.category === categoryFilter
      );
    }

    setFiltered(data);
  }, [statusFilter, categoryFilter, incidents]);

  async function loadMap() {
    try {
      const res = await getIncidentMap();

      setIncidents(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
      <AnimatedBackground />
        <Navbar />
        <main className="pt-32 text-center text-2xl text-white">
          Loading Map...
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black text-white">
            Live Incident Map
          </h1>

          <p className="mt-3 text-gray-400">
            Monitor incidents happening across the city in real time.
          </p>

          {/* Filters */}

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Resolved</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
            >
              <option>All</option>
              <option>Crime</option>
              <option>Fire</option>
              <option>Medical</option>
              <option>Road Accident</option>
              <option>Flood</option>
              <option>Electricity</option>
              <option>Building Collapse</option>
              <option>Missing Person</option>
              <option>Other</option>
            </select>

          </div>

          <Card className="mt-8 overflow-hidden p-3">

            <AdminIncidentMap
              incidents={filtered}
            />

          </Card>

        </Container>
      </main>
    </>
  );
}