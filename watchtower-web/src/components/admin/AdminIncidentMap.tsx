import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import greenMarker from "../../assets/markers/marker-green.png";
import yellowMarker from "../../assets/markers/marker-yellow.png";
import orangeMarker from "../../assets/markers/marker-orange.png";
import redMarker from "../../assets/markers/marker-red.png";
import markerShadow from "../../assets/markers/marker-shadow.png";
import { getMarker } from "../../utils/mapMarkers";

interface Incident {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  reportedBy?: {
    fullName: string;
    email: string;
  };

  images?: {
    url: string;
    publicId: string;
  }[];

  createdAt?: string;
}

interface Props {
  incidents: Incident[];
}

function getMarkerIcon(severity: string) {
  let iconUrl = greenMarker;

  switch (severity) {
    case "Medium":
      iconUrl = yellowMarker;
      break;

    case "High":
      iconUrl = orangeMarker;
      break;

    case "Critical":
      iconUrl = redMarker;
      break;

    default:
      iconUrl = greenMarker;
  }

  return new L.Icon({
    iconUrl,
    shadowUrl: markerShadow,

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export default function AdminIncidentMap({
  incidents,
}: Props) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={11}
      scrollWheelZoom
      className="h-[700px] w-full rounded-3xl"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents.map((incident) => (
        <Marker
          key={incident._id}
          position={[
            incident.location.latitude,
            incident.location.longitude,
          ]}
          icon={getMarker(incident.status)}
        >
          <Popup maxWidth={320} minWidth={280}>
            <div className="space-y-3">

              {incident.images &&
                incident.images.length > 0 && (
                  <img
                    src={incident.images[0].url}
                    alt={incident.title}
                    className="h-44 w-full rounded-lg object-cover"
                  />
                )}

              <div>

                <h2 className="text-lg font-bold">
                  {incident.title}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  {incident.description}
                </p>

              </div>

              <hr />

              <div className="space-y-1 text-sm">

                <p>
                  <strong>Category:</strong>{" "}
                  {incident.category}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  {incident.severity}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`rounded-full px-2 py-1 text-white text-xs
                    ${
                      incident.status === "Pending"
                        ? "bg-yellow-500"
                        : incident.status === "Verified"
                        ? "bg-blue-500"
                        : incident.status === "Resolved"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {incident.status}
                  </span>
                </p>

                <p>
                  <strong>Reporter:</strong>{" "}
                  {incident.reportedBy?.fullName ??
                    "Unknown"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {incident.reportedBy?.email ??
                    "-"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {incident.location.address}
                </p>

                {incident.createdAt && (
                  <p>
                    <strong>Reported:</strong>{" "}
                    {new Date(
                      incident.createdAt
                    ).toLocaleString()}
                  </p>
                )}

              </div>

            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}