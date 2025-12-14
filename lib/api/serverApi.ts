import { cookies } from 'next/headers';
import { api } from './api';
import type { AxiosResponse } from 'axios';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

async function buildCookieHeader() {
  const cookieStore = await cookies();
  const access = cookieStore.get('accessToken')?.value;
  const refresh = cookieStore.get('refreshToken')?.value;

  if (!access && !refresh) return undefined;

  return [
    access ? `accessToken=${access}` : null,
    refresh ? `refreshToken=${refresh}` : null,
  ]
    .filter(Boolean)
    .join('; ');
}

export const serverApi = {
  async getCurrentUser(): Promise<User> {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<User>('/users/me', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return data;
  },

  async fetchNoteById(id: string): Promise<Note> {
    const cookieHeader = await buildCookieHeader();

    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return data;
  },

  async checkSession(): Promise<AxiosResponse<User | null>> {
    const cookieHeader = await buildCookieHeader();

    return api.get<User | null>('/auth/session', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });
  },
};