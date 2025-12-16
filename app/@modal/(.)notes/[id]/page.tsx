import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NotePreviewClient from './NotePreview.client';
import { notFound } from 'next/navigation';
import type { Note } from '@/types/note';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params; 

  if (!id) notFound();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => serverApi.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}