import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
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
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 transition hover:border-cyan-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">
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
          className={`text-white transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

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
  className="flex w-full items-center gap-3 px-5 py-4 text-left text-white hover:bg-slate-800"
>
  <LayoutDashboard size={18} />
  Dashboard
</button>

          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-white hover:bg-slate-800"
          >
            <User size={18} />
            My Profile
          </button>

          <button
              onClick={() => {

               navigate("/notifications");

                setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-white hover:bg-slate-800"
          >
            <Bell size={18} />
            Notifications
          </button>

          <hr className="border-white/10" />

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}