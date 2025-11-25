import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : "http://localhost:3000/api",
  withCredentials: true,
});

export const api = axiosInstance;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage?: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {

  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload) => {
  const { data } = await axiosInstance.post("/notes", payload);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await axiosInstance.delete(`/notes/${id}`);
  return data;
};
