import L from "leaflet";
import "leaflet.awesome-markers";

export function getMarker(status: string) {
  let color = "blue";

  switch (status) {
    case "Pending":
      color = "orange";
      break;

    case "Verified":
      color = "green";
      break;

    case "Resolved":
      color = "cadetblue";
      break;

    case "Rejected":
      color = "red";
      break;
  }

  return (L as any).AwesomeMarkers.icon({
    icon: "triangle-exclamation",
    prefix: "fa",
    markerColor: color,
    iconColor: "white",
  });
}