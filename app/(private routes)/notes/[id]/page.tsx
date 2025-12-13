import { serverApi } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import type { Note } from '@/types/note';

interface PageProps {
  params: { id: string };
}

export default async function NotePage({ params }: PageProps) {
  const note: Note = await serverApi.fetchNoteById(params.id);

  return <NoteDetailsClient note={note} />;
}