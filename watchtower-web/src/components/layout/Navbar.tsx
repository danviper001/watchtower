import { useState } from "react";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Container from "../ui/Container";

import NotificationBell from "./NotificationBell";
import NotificationDrawer from "./NotificationDrawer";
import ProfileDropdown from "./ProfileDropdown";

import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  function goHome() {
    if (!user) {
      navigate("/");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;

      case "responder":
        navigate("/responder");
        break;

      default:
        navigate("/dashboard");
    }
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <Container>
          <nav className="flex h-20 items-center justify-between">

            {/* Logo */}

            <div
              onClick={goHome}
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                <Shield
                  size={28}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-wide text-white">
                  WatchTower
                </h1>

                <p className="text-xs text-gray-400">
                  Smart Community Safety
                </p>
              </div>
            </div>

            {/* Navigation */}

            <div className="hidden items-center gap-8 lg:flex">

              {!user && (
                <>
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Home
                  </button>

                  <a
                    href="#features"
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Features
                  </a>

                  <a
                    href="#stats"
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Statistics
                  </a>

                  <a
                    href="#contact"
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Contact
                  </a>
                </>
              )}

              {user?.role === "citizen" && (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => navigate("/report")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Report Incident
                  </button>

                  <button
                    onClick={() => navigate("/my-reports")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    My Reports
                  </button>
                </>
              )}

              {user?.role === "admin" && (
                <>
                  <button
                    onClick={() => navigate("/admin")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => navigate("/admin/incidents")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Incidents
                  </button>

                  <button
                    onClick={() => navigate("/admin/map")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Map
                  </button>
                </>
              )}

              {user?.role === "responder" && (
                <>
                  <button
                    onClick={() => navigate("/responder")}
                    className="text-gray-300 transition hover:text-cyan-400"
                  >
                    Dashboard
                  </button>
                </>
              )}

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4">

              {user && (
                <NotificationBell
                  onClick={() => setDrawerOpen(true)}
                />
              )}

              {user ? (
                <ProfileDropdown />
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  Login
                </Button>
              )}

            </div>

          </nav>
        </Container>
      </header>

      {/* Notification Drawer */}

      {user && (
        <NotificationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}