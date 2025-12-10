import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface GetNotesResponse {
  items: Note[];
  totalPages: number;
}

export const clientApi = {
  getNotes: async (params?: { page?: number; search?: string; tag?: string }): Promise<GetNotesResponse> => {
    const queryParams = {
      page: params?.page ?? 1,
      perPage: 12,
      search: params?.search ?? '',
      tag: params?.tag ?? undefined, 
    };
    const { data } = await api.get<GetNotesResponse>('/notes', { params: queryParams });
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

  register: async (email: string, password: string, username: string): Promise<User> => {
    const { data } = await api.post<User>('/auth/register', { email, password, username });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  checkSession: async (): Promise<User | null> => {
    const { data } = await api.get<User>('/auth/session');
    return data ?? null;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  updateProfile: async (payload: { username?: string }): Promise<User> => {
    const { data } = await api.patch<User>('/users/me', payload);
    return data;
  },
};