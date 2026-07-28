import api from "./axios";

export const getDashboardStats = () =>
  api.get("/admin/dashboard");

export const getAllIncidentsAdmin = () =>
  api.get("/admin/incidents");

export const verifyIncident = (id: string) =>
  api.put(`/admin/incidents/${id}/verify`);

export const resolveIncident = (id: string) =>
  api.put(`/admin/incidents/${id}/resolve`);

export const getAllUsers = () =>
  api.get("/admin/users");

export const assignResponder = (
  incidentId: string,
  responderId: string
) =>
  api.put(`/admin/incidents/${incidentId}/assign`, {
    responderId,
  });