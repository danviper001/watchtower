import api from "./axios";

export const getResponders = () =>
  api.get("/admin/users?role=responder");

export const assignResponder = (
  incidentId: string,
  responderId: string
) =>
  api.put(`/admin/incidents/${incidentId}/assign`, {
    responderId,
  });

export const getAssignedIncidents = () =>
  api.get("/responder/incidents");

export const acceptIncident = (id: string) =>
  api.put(`/responder/incidents/${id}/accept`);

export const markOnTheWay = (id: string) =>
  api.put(`/responder/incidents/${id}/on-the-way`);

export const markArrived = (id: string) =>
  api.put(`/responder/incidents/${id}/arrived`);

export const resolveIncident = (id: string) =>
  api.put(`/responder/incidents/${id}/resolve`);