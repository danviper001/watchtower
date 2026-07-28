import { useEffect, useState } from "react";
import socket from "../../socket";

interface Activity {
  message: string;
}

export default function LiveActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    function add(message: string) {
      setActivities((prev) => [
        { message },
        ...prev,
      ].slice(0, 20));
    }

    socket.on("incidentCreated", (i) =>
      add(`🚨 ${i.title} was reported`)
    );

    socket.on("incidentVerified", (i) =>
      add(`✅ ${i.title} verified`)
    );

    socket.on("incidentAssigned", (i) =>
      add(`🚑 Responder assigned to ${i.title}`)
    );

    socket.on("incidentAccepted", (i) =>
      add(`👨‍🚒 ${i.title} accepted`)
    );

    socket.on("incidentResolved", (i) =>
      add(`✔ ${i.title} resolved`)
    );

    return () => {
      socket.off("incidentCreated");
      socket.off("incidentVerified");
      socket.off("incidentAssigned");
      socket.off("incidentAccepted");
      socket.off("incidentResolved");
    };
  }, []);

  return (
    <div className="space-y-3">
      {activities.map((a, i) => (
        <div
          key={i}
          className="rounded-xl bg-slate-800 p-3"
        >
          {a.message}
        </div>
      ))}
    </div>
  );
}