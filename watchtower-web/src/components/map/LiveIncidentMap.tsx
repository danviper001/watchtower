import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Incident } from "../../types/incident";
import "leaflet/dist/leaflet.css";

interface Props {
  incidents: Incident[];
}

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function getIcon(severity: string) {
  switch (severity) {
    case "Critical":
      return redIcon;

    case "High":
      return orangeIcon;

    case "Medium":
      return yellowIcon;

    default:
      return greenIcon;
  }
}

export default function LiveIncidentMap({
  incidents,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">

      <MapContainer
        center={[6.5244, 3.3792]}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          height: "650px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => (
          <Marker
            key={incident._id}
            position={[
  incident.location?.latitude ?? 0,
  incident.location?.longitude ?? 0,
]}
            icon={getIcon(incident.severity)}
          >
            <Popup>

              <div className="space-y-2">

                <h2 className="text-lg font-bold">
                  {incident.title}
                </h2>

                <p>
                  <strong>Status:</strong>{" "}
                  {incident.status}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  {incident.severity}
                </p>

                <p>
  <strong>Category:</strong> {incident.category || "N/A"}
</p>

                <p>
                  {incident.description || "No description"}
                </p>

                <hr />

                <p>
                  📍 {incident.location?.address ?? "No address"}
                </p>

                <p>
                  👤 {incident.reportedBy?.fullName ?? "Unknown Reporter"}
                </p>

              </div>

            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}