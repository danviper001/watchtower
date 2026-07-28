import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Incident {
  _id: string;
  title: string;
  status: string;
  severity: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface Props {
  incidents: Incident[];
}

export default function IncidentMap({
  incidents,
}: Props) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={12}
      style={{
        height: "600px",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents.map((incident) => (
        <Marker
          key={incident._id}
          position={[
            incident.location.latitude,
            incident.location.longitude,
          ]}
        >
          <Popup>

            <h3 className="font-bold">
              {incident.title}
            </h3>

            <p>{incident.status}</p>

            <p>{incident.severity}</p>

            <p>{incident.location.address}</p>

          </Popup>

        </Marker>
      ))}

    </MapContainer>
  );
}