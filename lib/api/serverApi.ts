import { cookies } from 'next/headers';
import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

async function buildCookieHeader() {

  const cookieStore = await cookies();

  try {
    const parts: string[] = [];

    const accessToken = cookieStore.get?.('accessToken')?.value;
    const refreshToken = cookieStore.get?.('refreshToken')?.value;

    if (accessToken) parts.push(`accessToken=${accessToken}`);
    if (refreshToken) parts.push(`refreshToken=${refreshToken}`);

    return parts.length ? parts.join('; ') : undefined;
  } catch {
    return undefined;
  }
}

export const serverApi = {
  fetchNoteById: async (id: string): Promise<Note> => {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return data;
  },

  checkSession: async (): Promise<AxiosResponse<User>> => {
    const cookieHeader = await buildCookieHeader();

    return await api.get<User>('/auth/session', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });
  },

  getCurrentUser: async (): Promise<User> => {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<User>('/users/me', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return data;
  },
};