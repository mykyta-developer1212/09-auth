import { QueryClient } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => serverApi.fetchNoteById(params.id),
  });

  return <NotePreview noteId={params.id} />;
}