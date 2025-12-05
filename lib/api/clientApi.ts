import axios from 'axios';
import { Note } from '@/types/note';

export const clientApi = axios.create({
  baseURL: '/api',
});

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await clientApi.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const res = await clientApi.post('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await clientApi.delete(`/notes/${id}`);
};