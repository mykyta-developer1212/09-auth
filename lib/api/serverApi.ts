import axios from 'axios';
import { Note } from '@/types/note';

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await serverApi.get(`/notes/${id}`);
  return res.data;
};

export const checkSession = async () => {
  await serverApi.get('/auth/session');
};