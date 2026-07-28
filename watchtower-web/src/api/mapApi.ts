import api from "./axios";

export const getIncidentMap = () =>
  api.get("/admin/map");