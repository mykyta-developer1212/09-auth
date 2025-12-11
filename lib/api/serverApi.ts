import { cookies } from 'next/headers';
import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

// Функція для формування заголовка Cookie
async function buildCookieHeader() {
  const cookieStore = await cookies(); // Next 16 повертає Promise
  const access = cookieStore.get('accessToken')?.value;
  const refresh = cookieStore.get('refreshToken')?.value;

  if (!access && !refresh) return undefined;

  return [
    access ? `accessToken=${access}` : null,
    refresh ? `refreshToken=${refresh}` : null,
  ].filter(Boolean).join('; ');
}

export const serverApi = {
  getCurrentUser: async (): Promise<User> => {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<User>('/users/me', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      withCredentials: true,
    });

    return data;
  },

  fetchNoteById: async (id: string): Promise<Note> => {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      withCredentials: true,
    });

    return data;
  },

  checkSession: async (): Promise<User | null> => {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<User>('/auth/session', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      withCredentials: true,
    });

    return data ?? null;
  },
};