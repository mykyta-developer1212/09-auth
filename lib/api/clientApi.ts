import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post(`/auth/login`, { email, password });
  return data;
}

export async function register(email: string, password: string) {
  const { data } = await api.post(`/auth/register`, { email, password });
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get(`/users/me`);
  return data;
}

interface UpdateMePayload {
  email?: string;
  password?: string;
  username?: string;
  avatar?: string;
}

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  const { data } = await api.patch(`/users/me`, payload);
  return data;
}