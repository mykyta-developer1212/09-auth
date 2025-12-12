import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export const clientApi = {
  login(email: string, password: string) {
    return api.post<User>('/auth/login', { email, password }).then(res => res.data);
  },
  register(email: string, password: string) {
    return api.post<User>('/auth/register', { email, password }).then(res => res.data);
  },
  checkSession() {
    return api.get('/auth/session').then(() => true).catch(() => false);
  },
  getCurrentUser() {
    return api.get<User>('/users/me').then(res => res.data);
  },
  getNotes(params?: { page?: number; search?: string; tag?: string }) {
    return api.get<{ items: Note[]; totalPages: number }>('/notes', { params }).then(res => res.data);
  },
  getNoteById(id: string) {
    return api.get<Note>(`/notes/${id}`).then(res => res.data);
  },
  
  createNote(data: CreateNoteParams) {
    return api.post<Note>('/notes', data).then(res => res.data);
  },
};