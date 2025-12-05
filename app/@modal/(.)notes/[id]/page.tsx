import { fetchNoteById } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const note = await fetchNoteById(params.id);
  return <NotePreview noteId={note.id} />;
}