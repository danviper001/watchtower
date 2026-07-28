import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Trash2, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

import {
  getNotifications,
  markNotificationRead,
  markAllRead,
  deleteNotification,
} from "../../api/notificationApi";

import socket from "../../socket";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({
  open,
  onClose,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function loadNotifications() {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!open) return;

    loadNotifications();

    socket.on("notificationCreated", loadNotifications);
    socket.on("notificationUpdated", loadNotifications);

    return () => {
      socket.off("notificationCreated", loadNotifications);
      socket.off("notificationUpdated", loadNotifications);
    };
  }, [open]);

  async function markRead(id: string) {
    try {
      await markNotificationRead(id);

      toast.success("Notification marked as read");

      loadNotifications();
    } catch (error) {
      console.error(error);

      toast.error("Unable to update notification");
    }
  }

  async function handleReadAll() {
    try {
      await markAllRead();

      toast.success("All notifications marked as read");

      loadNotifications();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNotification(id);

      toast.success("Notification deleted");

      loadNotifications();
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete notification");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: 450 }}
            animate={{ x: 0 }}
            exit={{ x: 450 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-50 h-screen w-[420px] overflow-y-auto border-l border-white/10 bg-slate-900/95 backdrop-blur-xl"
          >
            {/* Header */}

            <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900/95 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <Bell className="text-cyan-400" />

                <h2 className="text-2xl font-black text-white">
                  Notifications
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReadAll}
                  className="rounded-lg bg-cyan-600 px-3 py-2 text-sm text-white transition hover:bg-cyan-500"
                >
                  <CheckCheck
                    size={16}
                    className="inline mr-1"
                  />
                  Read All
                </button>

                <button onClick={onClose}>
                  <X className="text-white" />
                </button>
              </div>
            </div>

            {/* Notifications */}

            <div className="space-y-4 p-5">
              {notifications.length === 0 ? (
                <div className="py-20 text-center">
                  <Bell
                    size={60}
                    className="mx-auto mb-4 text-gray-600"
                  />

                  <h3 className="text-xl font-bold text-white">
                    You're all caught up!
                  </h3>

                  <p className="mt-2 text-gray-400">
                    No notifications yet.
                  </p>
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n._id}
                    layout
                    whileHover={{
                      scale: 1.02,
                    }}
                    className={`rounded-2xl border p-5 shadow-lg transition ${
                      !n.isRead
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-white">
                          {n.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-300">
                          {n.message}
                        </p>

                        <p className="mt-3 text-xs text-cyan-400">
                          {formatDistanceToNow(
                            new Date(n.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      {!n.isRead && (
                        <button
                          onClick={() => markRead(n._id)}
                          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-500"
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(n._id)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-500"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}