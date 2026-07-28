import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  incidents: any[];
}

export default function ResponderMap({
  incidents,
}: Props) {
  if (!incidents.length) return null;

  return (
    <MapContainer
      center={[
        incidents[0].location.latitude,
        incidents[0].location.longitude,
      ]}
      zoom={13}
      className="h-[450px] rounded-2xl"
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

            <strong>
              {incident.title}
            </strong>

            <br />

            {incident.location.address}

            <br />

            {incident.status}

          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}