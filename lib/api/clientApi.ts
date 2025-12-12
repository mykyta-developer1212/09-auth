import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

interface GetNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

interface GetNotesResponse {
  items: Note[];
  totalPages: number;
}

export const clientApi = {
  async login(email: string, password: string): Promise<User> {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },

  async register(email: string, password: string): Promise<User> {
    const res = await api.post('/auth/register', { email, password });
    return res.data;
  },

  async checkSession(): Promise<boolean> {
    try {
      await api.get('/auth/session');
      return true;
    } catch {
      return false;
    }
  },

  async getCurrentUser(): Promise<User> {
    const res = await api.get('/users/me');
    return res.data;
  },

  async fetchNotes(params?: GetNotesParams): Promise<GetNotesResponse> {
    const res = await api.get('/notes', { params });
    return res.data;
  },

  async fetchNoteById(id: string): Promise<Note> {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  },
};