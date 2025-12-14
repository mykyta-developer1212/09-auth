import { serverApi } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Note } from '@/types/note';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => serverApi.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}