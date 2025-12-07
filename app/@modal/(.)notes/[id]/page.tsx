import NotePreview from './NotePreview.client';
import { serverApi } from '@/lib/api/serverApi';
import { QueryClient } from '@tanstack/react-query';

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => serverApi.fetchNoteById(params.id),
  });

  return <NotePreview noteId={params.id} />;
}