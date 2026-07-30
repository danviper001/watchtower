import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";

import { getIncidentById } from "../api/incidentApi";

interface Incident {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  createdAt: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  images: {
    url: string;
  }[];
}

export default function IncidentDetails() {

  const { id } = useParams();

  const [incident, setIncident] =
    useState<Incident | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadIncident();

  }, []);

  async function loadIncident() {

    try {

      const res =
        await getIncidentById(id!);

      setIncident(res.data);

    } catch {

      toast.error("Unable to load incident.");

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <>
      <AnimatedBackground />
        <Navbar />

        <main className="pt-32 text-center text-xl text-white">

          Loading Incident...

        </main>
      </>
    );

  }

  if (!incident) {

    return (
      <>
        <Navbar />

        <main className="pt-32 text-center text-xl text-red-400">

          Incident not found.

        </main>
      </>
    );

  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-transparent pt-28 pb-20">

        <Container>

          <Card>

            <h1 className="text-5xl font-black text-white">

              {incident.title}

            </h1>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-gray-400">

                  Status

                </p>

                <p className="text-xl font-bold">

                  {incident.status}

                </p>

              </div>

              <div>

                <p className="text-gray-400">

                  Severity

                </p>

                <p className="text-xl font-bold">

                  {incident.severity}

                </p>

              </div>

              <div>

                <p className="text-gray-400">

                  Category

                </p>

                <p className="text-xl font-bold">

                  {incident.category}

                </p>

              </div>

              <div>

                <p className="text-gray-400">

                  Address

                </p>

                <p className="text-xl">

                  {incident.location.address}

                </p>

              </div>

            </div>

          </Card>

        </Container>

      </main>

    </>
  );

}