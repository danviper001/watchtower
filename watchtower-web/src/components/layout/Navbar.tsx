import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

import Container from "../ui/Container";
import Button from "../ui/Button";
import NotificationBell from "./NotificationBell";
import NotificationDrawer from "./NotificationDrawer";
import ProfileDropdown from "./ProfileDropdown";

import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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

    setMobileMenu(false);
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <Container>
          <nav className="flex h-20 items-center justify-between">

            {/* Logo */}

            <div
              onClick={goHome}
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                <Shield size={28} className="text-white" />
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

            {/* Desktop Navigation */}

            <div className="hidden items-center gap-8 lg:flex">

              {!user && (
                <>
                  <ScrollLink
                    to="home"
                    smooth
                    duration={600}
                    offset={-80}
                    className="cursor-pointer text-gray-300 transition hover:text-cyan-400"
                  >
                    Home
                  </ScrollLink>

                  <ScrollLink
                    to="features"
                    smooth
                    duration={600}
                    offset={-80}
                    className="cursor-pointer text-gray-300 transition hover:text-cyan-400"
                  >
                    Features
                  </ScrollLink>

                  <ScrollLink
                    to="stats"
                    smooth
                    duration={600}
                    offset={-80}
                    className="cursor-pointer text-gray-300 transition hover:text-cyan-400"
                  >
                    Statistics
                  </ScrollLink>

                  <ScrollLink
                    to="contact"
                    smooth
                    duration={600}
                    offset={-80}
                    className="cursor-pointer text-gray-300 transition hover:text-cyan-400"
                  >
                    Contact
                  </ScrollLink>
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
                  className="hidden md:flex bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden"
              >
                {mobileMenu ? (
                  <X className="text-white" size={30} />
                ) : (
                  <Menu className="text-white" size={30} />
                )}
              </button>

            </div>

          </nav>

          {/* Mobile Menu */}

          {mobileMenu && (
            <div className="lg:hidden border-t border-white/10 bg-black/95">

              <div className="flex flex-col gap-5 py-6">

                {!user && (
                  <>
                    <ScrollLink
                      to="home"
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileMenu(false)}
                      className="cursor-pointer text-gray-300 hover:text-cyan-400"
                    >
                      Home
                    </ScrollLink>

                    <ScrollLink
                      to="features"
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileMenu(false)}
                      className="cursor-pointer text-gray-300 hover:text-cyan-400"
                    >
                      Features
                    </ScrollLink>

                    <ScrollLink
                      to="stats"
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileMenu(false)}
                      className="cursor-pointer text-gray-300 hover:text-cyan-400"
                    >
                      Statistics
                    </ScrollLink>

                    <ScrollLink
                      to="contact"
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setMobileMenu(false)}
                      className="cursor-pointer text-gray-300 hover:text-cyan-400"
                    >
                      Contact
                    </ScrollLink>

                    <Button
                      onClick={() => {
                        navigate("/login");
                        setMobileMenu(false);
                      }}
                      className="bg-cyan-600"
                    >
                      Login
                    </Button>
                  </>
                )}

                {user?.role === "citizen" && (
                  <>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileMenu(false);
                      }}
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        navigate("/report");
                        setMobileMenu(false);
                      }}
                    >
                      Report Incident
                    </button>

                    <button
                      onClick={() => {
                        navigate("/my-reports");
                        setMobileMenu(false);
                      }}
                    >
                      My Reports
                    </button>
                  </>
                )}

                {user?.role === "admin" && (
                  <>
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setMobileMenu(false);
                      }}
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/incidents");
                        setMobileMenu(false);
                      }}
                    >
                      Incidents
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/map");
                        setMobileMenu(false);
                      }}
                    >
                      Incident Map
                    </button>
                  </>
                )}

                {user?.role === "responder" && (
                  <button
                    onClick={() => {
                      navigate("/responder");
                      setMobileMenu(false);
                    }}
                  >
                    Dashboard
                  </button>
                )}

              </div>

            </div>
          )}

        </Container>
      </header>

      {user && (
        <NotificationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}