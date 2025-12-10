import { QueryClient, dehydrate } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import type { DehydratedState } from '@tanstack/react-query';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const id = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverApi.fetchNoteById(id),
  });

  const dehydratedState: DehydratedState = dehydrate(queryClient);

  return <NotePreview noteId={id} dehydratedState={dehydratedState} />;
}