import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IncidentStatusChart from "../components/charts/IncidentStatusChart";
import CategoryChart from "../components/charts/CategoryChart";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import Button from "../components/ui/Button";
import socket from "../socket";
import { getDashboardStats } from "../api/adminApi";
import StatCard from "../components/admin/StatCard";
import LiveActivity from "../components/admin/LiveActivity";
import Card from "../components/ui/Card";
import type { Incident } from "../types/incident";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import LiveIncidentMap from "../components/map/LiveIncidentMap";
import {
  FaUsers,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaFlagCheckered,
} from "react-icons/fa";

interface DashboardStats {
  totalUsers: number;
  totalIncidents: number;
  pending: number;
  verified: number;
  resolved: number;

  categoryStats: {
    _id: string;
    value: number;
  }[];

  monthlyStats: {
    _id: {
      year: number;
      month: number;
    };
    reports: number;
  }[];

incidents: Incident[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats>({
  totalUsers: 0,
  totalIncidents: 0,
  pending: 0,
  verified: 0,
  resolved: 0,
  categoryStats: [],
  monthlyStats: [],
  incidents: [],
});

  const [loading, setLoading] = useState(true);

useEffect(() => {
  loadDashboard();

  const refreshDashboard = () => {
    loadDashboard();
  };

  socket.on("incidentCreated", refreshDashboard);
  socket.on("incidentVerified", refreshDashboard);
  socket.on("incidentAssigned", refreshDashboard);
  socket.on("incidentAccepted", refreshDashboard);
  socket.on("incidentOnTheWay", refreshDashboard);
  socket.on("incidentArrived", refreshDashboard);
  socket.on("incidentResolved", refreshDashboard);

  return () => {
    socket.off("incidentCreated", refreshDashboard);
    socket.off("incidentVerified", refreshDashboard);
    socket.off("incidentAssigned", refreshDashboard);
    socket.off("incidentAccepted", refreshDashboard);
    socket.off("incidentOnTheWay", refreshDashboard);
    socket.off("incidentArrived", refreshDashboard);
    socket.off("incidentResolved", refreshDashboard);
  };
}, []);

  async function loadDashboard() {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
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
          Loading Dashboard...
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20">
        <Container>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h1 className="text-5xl font-black text-white">
                Admin Command Center
              </h1>

              <p className="mt-3 text-gray-400">
                Monitor and manage all incidents across the community.
              </p>
            </div>

            <Button
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
              onClick={() => navigate("/admin/incidents")}
            >
              Manage Incidents
            </Button>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-5">

  <StatCard
    title="Users"
    value={stats.totalUsers}
    color="text-cyan-400"
    icon={<FaUsers />}
  />

  <StatCard
    title="Incidents"
    value={stats.totalIncidents}
    color="text-blue-400"
    icon={<FaClipboardList />}
  />

  <StatCard
    title="Pending"
    value={stats.pending}
    color="text-yellow-400"
    icon={<FaClock />}
  />

  <StatCard
    title="Verified"
    value={stats.verified}
    color="text-green-400"
    icon={<FaCheckCircle />}
  />

  <StatCard
    title="Resolved"
    value={stats.resolved}
    color="text-purple-400"
    icon={<FaFlagCheckered />}
  />

</div>
<Card className="mt-10">

  <h2 className="mb-6 text-2xl font-bold text-white">
    🌍 Live Incident Map
  </h2>

  <LiveIncidentMap incidents={stats.incidents} />

</Card>
<div className="mt-10 grid gap-8 xl:grid-cols-3">

  <div className="xl:col-span-2 space-y-8">

    <IncidentStatusChart
      pending={stats.pending}
      verified={stats.verified}
      resolved={stats.resolved}
    />

    <CategoryChart
      data={stats.categoryStats}
    />

    <MonthlyTrendChart
      data={stats.monthlyStats}
    />

  </div>

  <Card>

    <h2 className="mb-6 text-2xl font-bold">
      Live Activity
    </h2>

    <LiveActivity />

  </Card>

</div>

        </Container>
      </main>
    </>
  );
}