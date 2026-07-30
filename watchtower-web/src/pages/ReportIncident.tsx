import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import IncidentMap from "../components/map/IncidentMap";

import { createIncident } from "../api/incidentApi";

interface ReportForm {
  title: string;
  description: string;
  category: string;
  severity: string;
  address: string;
  images: FileList;
}

export default function ReportIncident() {
  const [latitude, setLatitude] = useState(6.5244);
  const [longitude, setLongitude] = useState(3.3792);

  const [loading, setLoading] = useState(false);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportForm>();

  const onSubmit = async (data: ReportForm) => {
    try {
      setLoading(true);

      await createIncident({
        title: data.title,
        description: data.description,
        category: data.category,
        severity: data.severity,
        latitude,
        longitude,
        address: data.address,
        images: Array.from(data.images ?? []),
      });

      toast.success("Incident reported successfully!");

      reset();

      setPreviewImages([]);

      setLatitude(6.5244);
      setLongitude(3.3792);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ??
        "Failed to report incident."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="min-h-screen bg-transparent pt-28 pb-24">

        <Container>

          <div className="mb-12">

            <h1 className="text-5xl font-black text-white">
              Report Incident
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-400">
              Help protect your community by reporting suspicious
              activities, emergencies, accidents or disasters.
            </p>

          </div>

          <Card className="border border-cyan-500/20 bg-white/5 shadow-2xl shadow-cyan-500/10">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-10"
            >
           {/* Title */}

<div>
  <label className="mb-2 block font-semibold text-white">
    Incident Title
  </label>

  <Input
    type="text"
    placeholder="e.g. Building Fire at Main Market"
    {...register("title", {
      required: "Incident title is required",
      minLength: {
        value: 5,
        message: "Title must be at least 5 characters",
      },
    })}
    className={`text-white placeholder:text-gray-500 ${
      errors.title
        ? "border-red-500"
        : "border-white/10 focus:border-cyan-400"
    }`}
  />

  {errors.title && (
    <p className="mt-2 text-sm text-red-400">
      {errors.title.message}
    </p>
  )}
</div>

{/* Description */}

<div>
  <label className="mb-2 block font-semibold text-white">
    Description
  </label>

  <textarea
    rows={6}
    placeholder="Describe what happened..."
    {...register("description", {
      required: "Description is required",
      minLength: {
        value: 10,
        message:
          "Description must be at least 10 characters",
      },
    })}
    className={`w-full rounded-xl border bg-slate-900/60 p-4 text-white outline-none transition ${
      errors.description
        ? "border-red-500"
        : "border-white/10 focus:border-cyan-400"
    }`}
  />

  {errors.description && (
    <p className="mt-2 text-sm text-red-400">
      {errors.description.message}
    </p>
  )}
</div>

<div className="grid gap-6 md:grid-cols-2">

  {/* Category */}

  <div>

    <label className="mb-2 block font-semibold text-white">
      Category
    </label>

    <select
      {...register("category", {
        required: "Choose a category",
      })}
      className="h-14 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 text-white outline-none"
    >
      <option value="">Select Category</option>
      <option value="Crime">Crime</option>
      <option value="Fire">Fire</option>
      <option value="Medical">Medical</option>
      <option value="Road Accident">
        Road Accident
      </option>
      <option value="Flood">Flood</option>
      <option value="Electricity">
        Electricity
      </option>
      <option value="Building Collapse">
        Building Collapse
      </option>
      <option value="Missing Person">
        Missing Person
      </option>
      <option value="Other">Other</option>
    </select>

    {errors.category && (
      <p className="mt-2 text-sm text-red-400">
        {errors.category.message}
      </p>
    )}

  </div>

  {/* Severity */}

  <div>

    <label className="mb-2 block font-semibold text-white">
      Severity
    </label>

    <select
      {...register("severity", {
        required: "Choose severity",
      })}
      className="h-14 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 text-white outline-none"
    >
      <option value="">Select Severity</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Critical">
        Critical
      </option>
    </select>

    {errors.severity && (
      <p className="mt-2 text-sm text-red-400">
        {errors.severity.message}
      </p>
    )}

  </div>

</div>

{/* Location */}

<div>

  <label className="mb-4 block text-lg font-bold text-white">
    📍 Incident Location
  </label>

  <IncidentMap
    onLocationSelect={(lat, lng) => {
      setLatitude(lat);
      setLongitude(lng);
    }}
  />

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    <Input
      value={latitude}
      readOnly
    />

    <Input
      value={longitude}
      readOnly
    />

  </div>

</div>

{/* Address */}

<div>

  <label className="mb-2 block font-semibold text-white">
    Address
  </label>

  <Input
    placeholder="Nearest landmark"
    {...register("address", {
      required: "Address is required",
    })}
    className="text-white"
  />

  {errors.address && (
    <p className="mt-2 text-sm text-red-400">
      {errors.address.message}
    </p>
  )}

</div>

{/* Images */}

<div>

  <label className="mb-4 block font-semibold text-white">
    Upload Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    {...register("images")}
    onChange={(e) => {

      register("images").onChange(e);

      const files = Array.from(
        e.target.files || []
      );

      const previews = files.map((file) =>
        URL.createObjectURL(file)
      );

      setPreviewImages(previews);

    }}
    className="block w-full rounded-xl border border-dashed border-cyan-500/40 bg-slate-900/60 p-5 text-white"
  />

  {previewImages.length > 0 && (

    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

      {previewImages.map((image, index) => (

        <img
          key={index}
          src={image}
          alt="preview"
          className="h-36 w-full rounded-xl object-cover"
        />

      ))}

    </div>

  )}

</div>

<Button
  type="submit"
  disabled={loading}
  className="h-14 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Submitting Report..."
    : "🚨 Submit Incident"}
</Button>

</form>

</Card>

</Container>

</main>

</>
);
}