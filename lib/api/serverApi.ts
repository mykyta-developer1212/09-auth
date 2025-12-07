import { cookies } from 'next/headers';
import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export const serverApi = {
  fetchNoteById: async (id: string): Promise<Note> => {
    const cookieStore = await cookies(); 
    const accessToken = cookieStore.get('accessToken')?.value;
    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: accessToken ? { Cookie: `accessToken=${accessToken}` } : undefined,
    });
    return data;
  },

  checkSession: async (): Promise<User> => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const { data } = await api.get<User>('/auth/session', {
      headers: refreshToken ? { Cookie: `refreshToken=${refreshToken}` } : undefined,
    });
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const { data } = await api.get<User>('/users/me', {
      headers: accessToken ? { Cookie: `accessToken=${accessToken}` } : undefined,
    });
    return data;
  },
};