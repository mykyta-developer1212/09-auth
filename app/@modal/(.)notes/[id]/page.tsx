import { serverApi } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  await serverApi.fetchNoteById(params.id);

  return <NotePreview noteId={params.id} />;
}