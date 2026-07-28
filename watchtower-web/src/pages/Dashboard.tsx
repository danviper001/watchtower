import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import { useAuth } from "../contexts/AuthContext";
import { getUserStats } from "../api/userApi";

interface Stats {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
}

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getUserStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black">
            Welcome back,
          </h1>

          <h2 className="mt-2 text-2xl text-cyan-400">
            {user?.fullName}
          </h2>

          <p className="mt-3 text-gray-400">
            Here's an overview of your WatchTower activity.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <Card>
              <h3 className="text-gray-400">
                Total Reports
              </h3>

              <p className="mt-4 text-5xl font-black text-cyan-400">
                {stats.totalReports}
              </p>
            </Card>

            <Card>
              <h3 className="text-gray-400">
                Pending
              </h3>

              <p className="mt-4 text-5xl font-black text-yellow-400">
                {stats.pendingReports}
              </p>
            </Card>

            <Card>
              <h3 className="text-gray-400">
                Resolved
              </h3>

              <p className="mt-4 text-5xl font-black text-green-400">
                {stats.resolvedReports}
              </p>
            </Card>

          </div>

        </Container>
      </main>
    </>
  );
}