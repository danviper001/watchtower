import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import { changePassword } from "../../api/userApi";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: Props) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [onClose]);

  if (!open) return null;

  function passwordStrength() {
    if (newPassword.length < 6)
      return {
        text: "Weak",
        color: "bg-red-500",
      };

    if (newPassword.length < 10)
      return {
        text: "Medium",
        color: "bg-yellow-500",
      };

    return {
      text: "Strong",
      color: "bg-green-500",
    };
  }

  const strength = passwordStrength();

  async function handleSubmit() {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return toast.error(
        "Fill in all fields"
      );
    }

    if (newPassword !== confirmPassword) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      await changePassword(
        currentPassword,
        newPassword
      );

      toast.success(
        "Password updated successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();

    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full max-w-lg px-6"
      >
        <Card>

          <div className="mb-8 flex items-center gap-3">

            <ShieldCheck
              size={36}
              className="text-cyan-400"
            />

            <div>

              <h2 className="text-3xl font-black text-white">
                Change Password
              </h2>

              <p className="text-gray-400">
                Secure your account
              </p>

            </div>

          </div>

          {/* Current */}

          <div className="mb-5">

            <label className="mb-2 block text-gray-300">
              Current Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-gray-500" />

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 py-4 pl-12 pr-14 text-white outline-none focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showCurrent ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}
              </button>

            </div>

          </div>

          {/* New */}

          <div className="mb-5">

            <label className="mb-2 block text-gray-300">
              New Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-gray-500" />

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 py-4 pl-12 pr-14 text-white outline-none focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showNew ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}
              </button>

            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-800">

              <div
                className={`h-full rounded-full ${strength.color}`}
                style={{
                  width:
                    strength.text === "Weak"
                      ? "33%"
                      : strength.text ===
                        "Medium"
                      ? "66%"
                      : "100%",
                }}
              />

            </div>

            <p className="mt-2 text-sm text-gray-400">
              Strength: {strength.text}
            </p>

          </div>

          {/* Confirm */}

          <div>

            <label className="mb-2 block text-gray-300">
              Confirm Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-gray-500" />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 py-4 pl-12 pr-14 text-white outline-none focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showConfirm ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}
              </button>

            </div>

          </div>

          <div className="mt-10 flex justify-end gap-4">

            <Button
              onClick={onClose}
              className="bg-slate-700"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-cyan-600"
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </Button>

          </div>

        </Card>
      </div>
    </div>
  );
}