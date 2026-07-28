import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
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
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: Props) {
  const [position, setPosition] =
    useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const pos: [number, number] = [
        e.latlng.lat,
        e.latlng.lng,
      ];

      setPosition(pos);
      onLocationSelect(pos[0], pos[1]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function IncidentMap({
  onLocationSelect,
}: Props) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={13}
      className="h-[400px] w-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        onLocationSelect={onLocationSelect}
      />
    </MapContainer>
  );
}