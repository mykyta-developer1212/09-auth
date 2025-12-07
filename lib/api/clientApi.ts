import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface GetNotesResponse {
  items: Note[];
  totalPages: number;
}

export const clientApi = {
  getNotes: async (params?: { page?: number; search?: string; tag?: string }): Promise<GetNotesResponse> => {
    const { data } = await api.get<GetNotesResponse>('/notes', { params });
    return data;
  },

  getNoteById: async (id: string): Promise<Note> => {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
  },

  createNote: async (note: { title: string; content: string; tag: string }): Promise<Note> => {
    const { data } = await api.post<Note>('/notes', note);
    return data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
  },

  login: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post<User>('/auth/login', { email, password });
    return data;
  },

  register: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post<User>('/auth/register', { email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  updateProfile: async (user: { username?: string }): Promise<User> => {
    const { data } = await api.patch<User>('/users/me', user);
    return data;
  },

  checkSession: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/session');
    return data;
  },
};