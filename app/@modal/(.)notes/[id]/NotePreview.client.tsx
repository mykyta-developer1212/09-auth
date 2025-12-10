'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import type { DehydratedState } from '@tanstack/react-query';

interface NotePreviewProps {
  noteId: string;
  dehydratedState?: DehydratedState; 
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const query = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  const note = query.data;
  const isLoading = query.isLoading;
  const isError = !!query.error;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </Modal>
  );
}