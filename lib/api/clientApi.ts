import { nextServer } from "./api";

export const loginUser = async (body: { email: string; password: string }) => {
  const res = await nextServer.post('/auth/login', body);
  return res.data;
};

export const logoutUser = async () => {
  const res = await nextServer.post('/auth/logout');
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');
  return res.data;
};