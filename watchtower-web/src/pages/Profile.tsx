import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Mail, Shield, User } from "lucide-react";
import EditProfileModal from "../components/profile/EditProfileModal";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import { useAuth } from "../contexts/AuthContext";
import { getProfile, uploadAvatar } from "../api/userApi";

export default function Profile() {
  const { user, login } = useAuth();

  const [profile, setProfile] = useState(user);

  const [passwordOpen, setPasswordOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      toast.error("Failed to load profile");
    }
  }

  async function handleAvatarChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const updatedUser = await uploadAvatar(file);

      setProfile(updatedUser);

      login(
        updatedUser,
        localStorage.getItem("token") || ""
      );

      toast.success("Profile picture updated");

    } catch {
      toast.error("Upload failed");
    }
  }

  if (!profile) return null;

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black text-white">
            My Profile
          </h1>

          <p className="mt-3 text-gray-400">
            Manage your account information.
          </p>

          <Card className="mt-10">

            {/* Avatar */}

            <div className="flex flex-col items-center gap-6">

              <img
                src={
                  profile.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.fullName
                  )}&background=0891b2&color=fff&size=256`
                }
                alt={profile.fullName}
                className="h-40 w-40 rounded-full border-4 border-cyan-500 object-cover"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />

              <Button
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </Button>

            </div>

            {/* User Information */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <Card>
                <div className="flex items-center gap-3">

                  <User className="text-cyan-400" />

                  <div>
                    <p className="text-sm text-gray-400">
                      Full Name
                    </p>

                    <p className="text-lg font-semibold text-white">
                      {profile.fullName}
                    </p>
                  </div>

                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">

                  <Mail className="text-cyan-400" />

                  <div>
                    <p className="text-sm text-gray-400">
                      Email
                    </p>

                    <p className="text-lg font-semibold text-white">
                      {profile.email}
                    </p>
                  </div>

                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">

                  <Shield className="text-cyan-400" />

                  <div>
                    <p className="text-sm text-gray-400">
                      Role
                    </p>

                    <p className="text-lg font-semibold capitalize text-white">
                      {profile.role}
                    </p>
                  </div>

                </div>
              </Card>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Button
  onClick={() => setEditOpen(true)}
  className="bg-cyan-600"
>
  Edit Profile
</Button>

              <Button
  onClick={() => setPasswordOpen(true)}
  className="bg-yellow-600"
>
  Change Password
</Button>

            </div>

          </Card>

        </Container>
      </main>
      <EditProfileModal
  open={editOpen}
  onClose={() => setEditOpen(false)}
  profile={profile}
  onUpdated={(updatedUser) => {
    setProfile(updatedUser);
  }}
/>
<ChangePasswordModal
  open={passwordOpen}
  onClose={() => setPasswordOpen(false)}
/>
    </>
  );
}