import { axiosInstance } from "./api";

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

export const register = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/register", { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data;
};

export const updateMe = async (updates: { email?: string; password?: string }) => {
  const { data } = await axiosInstance.put("/users/me", updates);
  return data;
};