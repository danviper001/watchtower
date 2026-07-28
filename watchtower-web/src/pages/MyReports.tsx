import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getMyIncidents, deleteIncident } from "../api/incidentApi";
import { useNavigate } from "react-router-dom";

interface Incident {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  createdAt: string;
  location: {
    address: string;
  };
  images: {
    url: string;
  }[];
}

export default function MyReports() {
  const [reports, setReports] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);

      const res = await getMyIncidents();

      setReports(res.data.incidents);

    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this report?")) return;

    try {
      await deleteIncident(id);

      toast.success("Incident deleted");

      loadReports();

    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20">
        <Container>

          <div className="mb-10">
            <h1 className="text-5xl font-black text-white">
              My Reports
            </h1>

            <p className="mt-3 text-gray-400">
              View and manage all incidents you've reported.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-white text-xl py-20">
              Loading reports...
            </div>
          ) : reports.length === 0 ? (
            <Card>
              <div className="py-12 text-center">
                <h2 className="text-2xl font-bold text-white">
                  No reports yet
                </h2>

                <p className="mt-3 text-gray-400">
                  You haven't reported any incidents.
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-8">

              {reports.map((report) => (

                <Card
                  key={report._id}
                  className="transition hover:scale-[1.01]"
                >
                  <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

                    <img
                      src={
                        report.images.length
                          ? report.images[0].url
                          : "https://placehold.co/600x400?text=No+Image"
                      }
                      className="h-64 w-full rounded-2xl object-cover"
                    />

                    <div>

                      <div className="flex flex-wrap items-center justify-between gap-4">

                        <h2 className="text-3xl font-bold text-white">
                          {report.title}
                        </h2>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-bold ${
                            report.status === "Resolved"
                              ? "bg-green-500/20 text-green-400"
                              : report.status === "Verified"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {report.status}
                        </span>

                      </div>

                      <div className="mt-5 grid gap-3 text-gray-300">

                        <p>
                          <strong>Category:</strong>{" "}
                          {report.category}
                        </p>

                        <p>
                          <strong>Severity:</strong>{" "}
                          {report.severity}
                        </p>

                        <p>
                          <strong>Location:</strong>{" "}
                          {report.location.address}
                        </p>

                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(
                            report.createdAt
                          ).toLocaleString()}
                        </p>

                      </div>

                      <p className="mt-6 text-gray-400">
                        {report.description}
                      </p>

                      <div className="mt-8 flex gap-4">

                        <Button onClick={() => navigate(`/incident/${report._id}`)} className="bg-cyan-600 text-white">
                          View
                        </Button>

                        <Button className="bg-yellow-500 text-black">
                          Edit
                        </Button>

                        <Button
                          onClick={() =>
                            handleDelete(report._id)
                          }
                          className="bg-red-600 text-white"
                        >
                          Delete
                        </Button>

                      </div>

                    </div>

                  </div>
                </Card>

              ))}

            </div>
          )}

        </Container>
      </main>
    </>
  );
}