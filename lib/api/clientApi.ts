import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export interface GetNotesResponse {
  notes: Note[];       
  totalPages: number;
}

export interface GetNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateUserParams {
  username: string;
}

export const clientApi = {
  async login(email: string, password: string): Promise<User> {
    const { data } = await api.post<User>('/api/auth/login', { email, password });
    return data;
  },

  async register(email: string, password: string): Promise<User> {
    const { data } = await api.post<User>('/api/auth/register', { email, password });
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  async checkSession(): Promise<User | null> {
    try {
      const { data } = await api.get<User>('/api/auth/session');
      return data;
    } catch {
      return null;
    }
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/api/users/me');
    return data;
  },

  async updateCurrentUser(payload: UpdateUserParams): Promise<User> {
    const { data } = await api.patch<User>('/api/users/me', payload);
    return data;
  },

  async getNotes(params?: GetNotesParams): Promise<GetNotesResponse> {
    const { data } = await api.get<GetNotesResponse>('/api/notes', { params });
    return data;
  },

  async getNoteById(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/api/notes/${id}`);
    return data;
  },

  async createNote(payload: CreateNoteParams): Promise<Note> {
    const { data } = await api.post<Note>('/api/notes', payload);
    return data;
  },

  async deleteNote(id: string): Promise<Note> {
    const { data } = await api.delete<Note>(`/api/notes/${id}`);
    return data;
  },
};