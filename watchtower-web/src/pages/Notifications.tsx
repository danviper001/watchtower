import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import socket from "../socket";
import api from "../api/axios";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  CheckCircle,
  Bell,
  Truck,
  ShieldCheck,
} from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

function getIcon(type: string) {
  switch (type) {
    case "incident":
      return <AlertTriangle className="text-red-400" size={26} />;

    case "verified":
      return <ShieldCheck className="text-cyan-400" size={26} />;

    case "assigned":
      return <Bell className="text-yellow-400" size={26} />;

    case "accepted":
      return <CheckCircle className="text-green-400" size={26} />;

    case "resolved":
      return <Truck className="text-blue-400" size={26} />;

    default:
      return <Bell className="text-gray-400" size={26} />;
  }
}

function getBadge(type: string) {
  switch (type) {
    case "incident":
      return "bg-red-500/20 text-red-300";

    case "verified":
      return "bg-cyan-500/20 text-cyan-300";

    case "assigned":
      return "bg-yellow-500/20 text-yellow-300";

    case "accepted":
      return "bg-green-500/20 text-green-300";

    case "resolved":
      return "bg-blue-500/20 text-blue-300";

    default:
      return "bg-gray-500/20 text-gray-300";
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  useEffect(() => {
    loadNotifications();

    socket.on("newNotification", loadNotifications);
    socket.on("notificationUpdated", loadNotifications);

    return () => {
      socket.off("newNotification");
      socket.off("notificationUpdated");
    };
  }, []);

  async function loadNotifications() {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  }

  async function markRead(id: string) {
    await api.put(`/notifications/${id}/read`);
    loadNotifications();
  }

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications;

    if (filter === "unread") {
      return notifications.filter((n) => !n.isRead);
    }

    if (filter === "read") {
      return notifications.filter((n) => n.isRead);
    }

    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  return (
    <>
    <AnimatedBackground />
      <Navbar />

      <main className="min-h-screen bg-transparent pt-28 pb-20">
        <Container>

          <h1 className="text-5xl font-black text-white">
            Notifications
          </h1>

          <p className="mt-3 text-gray-400">
            Stay updated with incident activity.
          </p>

          {/* Stats */}

          <div className="mt-6 flex flex-wrap gap-4">

            <div className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white">
              Total: {notifications.length}
            </div>

            <div className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white">
              Unread: {unreadCount}
              
            </div>

            

          </div>

          {/* Filters */}

          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "all",
              "unread",
              "read",
              "incident",
              "verified",
              "assigned",
              "accepted",
              "resolved",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-5 py-2 transition ${
                  filter === item
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                {item.charAt(0).toUpperCase() +
                  item.slice(1)}
              </button>
            ))}

          </div>

          {/* Notifications */}

          <div className="mt-10 space-y-5">

            {filteredNotifications.length === 0 ? (
              
              <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.35 }}
>

              <Card className="text-center py-16">

                <Bell
                  className="mx-auto text-gray-500"
                  size={50}
                />

                <h2 className="mt-4 text-2xl font-bold text-white">
                  No Notifications
                </h2>

                <p className="mt-2 text-gray-400">
                  Everything is quiet for now.
                </p>

              </Card>
              </motion.div>
            ) : (
              filteredNotifications.map((n, index) => (

<motion.div
  key={n._id}
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
  duration: 0.35,
  delay: index * 0.05,
}}
>

                <Card
                  className={`transition-all duration-300 hover:scale-[1.01] ${
                    !n.isRead
                      ? "border-l-4 border-cyan-500 shadow-lg shadow-cyan-500/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-5">

                    {getIcon(n.type)}

                    {!n.isRead && (
    <span className="mt-2 h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
  )}

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-bold text-white">
                          {n.title}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getBadge(
                            n.type
                          )}`}
                        >
                          {n.type}
                        </span>

                      </div>

                      <p className="mt-3 text-gray-300">
                        {n.message}
                      </p>

                      <p className="mt-4 text-xs text-cyan-400">
  {formatDistanceToNow(new Date(n.createdAt), {
    addSuffix: true,
  })}
</p>
                    </div>

                    {!n.isRead && (
                      <button
                        onClick={() => markRead(n._id)}
                        className="rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
                      >
                        Mark Read
                      </button>
                    )}

                  </div>
                </Card>
                </motion.div>
              ))
            )}

          </div>

        </Container>
      </main>
    </>
  );
}