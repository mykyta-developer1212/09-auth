import { serverApi } from '@/lib/api/serverApi';
import NotePreviewClient from './NoteDetails.client';
import type { Note } from '@/types/note';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note: Note = await serverApi.fetchNoteById(params.id);

  return <NotePreviewClient note={note} />;
}