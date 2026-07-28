import api from "./axios";

export interface IncidentData {
  title: string;
  description: string;
  category: string;
  severity: string;
  latitude: number;
  longitude: number;
  address: string;
  images: File[];
}

export async function createIncident(data: IncidentData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("severity", data.severity);
  formData.append("latitude", String(data.latitude));
  formData.append("longitude", String(data.longitude));
  formData.append("address", data.address);

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post("/incidents", formData);

  return response.data;
}

export async function getMyIncidents() {
  const response = await api.get("/incidents/my");
  return response.data;
}

export async function getIncident(id: string) {
  const response = await api.get(`/incidents/${id}`);
  return response.data;
}

export async function deleteIncident(id: string) {
  const response = await api.delete(`/incidents/${id}`);
  return response.data;
}

export const getIncidentById = (
    id: string
) => api.get(`/incidents/${id}`);