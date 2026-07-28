import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { getAllUsers, assignResponder } from "../../api/adminApi";

interface Responder {
  _id: string;
  fullName: string;
  email: string;
}

interface Props {
  incidentId: string;
  open: boolean;
  onClose: () => void;
  onAssigned: () => void;
}

export default function AssignResponderModal({
  incidentId,
  open,
  onClose,
  onAssigned,
}: Props) {
  const [responders, setResponders] = useState<Responder[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    loadResponders();
  }, [open]);

  async function loadResponders() {
  try {
    const res = await getAllUsers();

    const responders = res.data.filter(
      (user: any) => user.role === "responder"
    );

    setResponders(responders);
  } catch (err) {
    console.error(err);
  }
}

  async function handleAssign() {
  console.log("Selected responder:", selected);
  console.log("Incident:", incidentId);

  if (!selected) {
    console.log("No responder selected");
    return;
  }

  setLoading(true);

  try {
    const res = await assignResponder(
      incidentId,
      selected
    );

    console.log("Assignment success:", res.data);

    onAssigned();
    onClose();

  } catch (err) {
    console.error("Assignment failed:", err);
  } finally {
    setLoading(false);
  }
}

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[450px] rounded-2xl bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Assign Responder
        </h2>

        <select
          value={selected}
          onChange={(e) =>
            setSelected(e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white"
        >
          <option value="">
            Select responder
          </option>

          {responders.map((r) => (
            <option
              key={r._id}
              value={r._id}
            >
              {r.fullName}
            </option>
          ))}
        </select>

        <div className="mt-8 flex justify-end gap-4">

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleAssign}
            className="bg-cyan-600"
          >
            {loading
              ? "Assigning..."
              : "Assign"}
          </Button>

        </div>

      </div>

    </div>
  );
}