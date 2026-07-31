import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  if (!user) return null;

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          px-2 py-2
          sm:px-4
          transition-all
          hover:border-cyan-500/50
          hover:bg-white/10
        "
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/20">
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        <div className="hidden text-left md:block">
          <p className="font-semibold text-white">
            {user.fullName}
          </p>

          <p className="text-xs capitalize text-gray-400">
            {user.role}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`hidden md:block text-white transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              mt-3
              w-64
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-black/90
              backdrop-blur-2xl
              shadow-2xl
              shadow-cyan-500/10
            "
          >
            <button
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "responder") {
                  navigate("/responder");
                } else {
                  navigate("/dashboard");
                }

                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-cyan-500/10"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-cyan-500/10"
            >
              <User size={18} />
              My Profile
            </button>

            <button
              onClick={() => {
                navigate("/notifications");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-cyan-500/10"
            >
              <Bell size={18} />
              Notifications
            </button>

            <hr className="border-white/10" />

            <button
              onClick={() => {
                logout();
                navigate("/login");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}