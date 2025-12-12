import axios from "axios";
import type { Note } from "@/types/note";

export interface GetNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface GetNotesResponse {
  items: Note[];
  page: number;
  totalPages: number;
}

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true, // ⬅ ОБОВʼЯЗКОВО
});

export const clientApi = {
  async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  async register(email: string, password: string) {
    const res = await api.post("/auth/register", { email, password });
    return res.data;
  },

  async checkSession() {
    const res = await api.get("/auth/session");
    return res.data;
  },

  async getCurrentUser() {
    const res = await api.get("/auth/current");
    return res.data;
  },


  async getNotes(params: GetNotesParams = {}): Promise<GetNotesResponse> {
    const res = await api.get("/notes", {
      params,
    });
    return res.data;
  },

  async getNoteById(id: string): Promise<Note> {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  },
};