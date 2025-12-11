import { QueryClient, dehydrate } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';
import type { DehydratedState } from '@tanstack/react-query';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverApi.fetchNoteById(id),
  });

  const dehydratedState: DehydratedState = dehydrate(queryClient);

  return <NotePreview noteId={id} dehydratedState={dehydratedState} />;
}