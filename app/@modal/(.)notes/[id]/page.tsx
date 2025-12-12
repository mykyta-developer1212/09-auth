import { QueryClient, dehydrate } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverApi.fetchNoteById(id),
  });

  dehydrate(queryClient);

  return <NotePreview noteId={id} />;
}