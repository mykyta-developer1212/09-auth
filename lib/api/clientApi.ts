import { axiosInstance } from "./api";

export const getMe = async () => {
  const { data } = await axiosInstance.get("/api/users/me");
  return data;
};

export const updateMe = async (payload: { username: string }) => {
  const { data } = await axiosInstance.patch("/api/users/me", payload);
  return data;
};