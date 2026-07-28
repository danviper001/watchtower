import api from "./axios";

export const getNotifications = () =>
  api.get("/notifications");

export const markNotificationRead = (id: string) =>
  api.put(`/notifications/${id}/read`);

export const markAllRead = () =>
  api.put("/notifications/read-all");

export const deleteNotification = (id: string) =>
  api.delete(`/notifications/${id}`);