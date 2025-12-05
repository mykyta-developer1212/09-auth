import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetails from './NoteDetails.client';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await fetchNoteById(params.id);

  return <NoteDetails note={note} />;
}
