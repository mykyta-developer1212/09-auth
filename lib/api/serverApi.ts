import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { User } from '@/types/user';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const serverApi = {
  fetchNoteById: async (id: string): Promise<Note> => {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;

    const { data }: AxiosResponse<Note> = await apiClient.get(`/notes/${id}`, {
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });

    return data;
  },

  checkSession: async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await apiClient.get('/auth/session', {
      headers: { Cookie: `token=${token}` },
    });
    return response;
  },

  getCurrentUser: async (): Promise<User> => {
    const cookieStore = await cookies(); // <--- await тут
    const token = cookieStore.get('token')?.value;

    const { data }: AxiosResponse<User> = await apiClient.get('/users/me', {
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });

    return data;
  },
};