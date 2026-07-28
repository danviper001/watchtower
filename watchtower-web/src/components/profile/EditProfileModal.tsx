import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  X,
  Save,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import { updateProfile } from "../../api/userApi";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  profile: any;
  onUpdated: (user: any) => void;
}

export default function EditProfileModal({
  open,
  onClose,
  profile,
  onUpdated,
}: Props) {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  if (!open) return null;

  async function handleSave() {
    try {
      setLoading(true);

      const updated = await updateProfile(form);

      onUpdated(updated);

      login(
        updated,
        localStorage.getItem("token") || ""
      );

      toast.success("Profile Updated");

      onClose();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="flex min-h-screen items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full max-w-2xl border border-cyan-500/20 bg-slate-900">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-3xl font-black text-white">
              Edit Profile
            </h2>

            <button
              onClick={onClose}
              className="rounded-xl bg-red-600 p-2 transition hover:bg-red-700"
            >
              <X className="text-white" />
            </button>

          </div>

          <div className="space-y-6">

            {/* Full Name */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                <User size={18} />
                Full Name
              </label>

              <input
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                <Mail size={18} />
                Email
              </label>

              <input
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                <Phone size={18} />
                Phone
              </label>

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            {/* Address */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={18} />
                Address
              </label>

              <input
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            {/* Bio */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                <FileText size={18} />
                Bio
              </label>

              <textarea
                rows={5}
                value={form.bio}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bio: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            <div className="flex justify-end gap-4">

              <Button
                onClick={onClose}
                className="bg-slate-700"
              >
                Cancel
              </Button>

              <Button
                disabled={loading}
                onClick={handleSave}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save
                      size={18}
                      className="mr-2"
                    />
                    Save Changes
                  </>
                )}
              </Button>

            </div>

          </div>

        </Card>
      </div>
    </div>
  );
}