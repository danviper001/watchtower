import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";

import socket from "../../socket";
import { getNotifications } from "../../api/notificationApi";

interface Notification {
  _id: string;
  isRead: boolean;
}

interface Props {
  onClick: () => void;
}

export default function NotificationBell({
  onClick,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function loadNotifications() {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadNotifications();

    socket.on("notificationCreated", () => {
      loadNotifications();
      toast.success("🔔 New Notification");
    });

    socket.on("notificationUpdated", loadNotifications);

    return () => {
      socket.off("notificationCreated");
      socket.off("notificationUpdated");
    };
  }, []);

  const unread = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <button
      onClick={onClick}
      className="relative rounded-full p-2 transition hover:bg-white/10"
    >
      <FaBell
        size={22}
        className="text-white"
      />

      {unread > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-red-600
            text-xs
            font-bold
            text-white
          "
        >
          {unread}
        </span>
      )}
    </button>
  );
}