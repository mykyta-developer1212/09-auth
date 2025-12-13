import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export interface GetNotesResponse {
  items: Note[];
  totalPages: number;
}

export interface GetNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export const clientApi = {
  async login(email: string, password: string): Promise<User> {
    const res = await api.post<User>('/auth/login', { email, password });
    return res.data;
  },

  async register(email: string, password: string): Promise<void> {
    await api.post('/auth/register', { email, password });
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async checkSession(): Promise<User | null> {
    try {
      const res = await api.get<User>('/auth/session');
      return res.data || null;
    } catch {
      return null;
    }
  },

  async getCurrentUser(): Promise<User> {
    const res = await api.get<User>('/users/me');
    return res.data;
  },

  async getNotes(params?: GetNotesParams): Promise<GetNotesResponse> {
    const res = await api.get<GetNotesResponse>('/notes', { params });
    return res.data;
  },

  async getNoteById(id: string): Promise<Note> {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
  },

  async createNote(data: CreateNoteParams): Promise<Note> {
    const res = await api.post<Note>('/notes', data);
    return res.data;
  },

  async deleteNote(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};