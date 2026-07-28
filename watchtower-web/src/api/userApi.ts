import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const getUserStats = async () => {
  const res = await api.get("/users/stats");
  return res.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await api.put(
    "/users/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put(
    "/users/me",
    data
  );

  return res.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const res = await api.put(
    "/users/change-password",
    {
      currentPassword,
      newPassword,
    }
  );

  return res.data;
};