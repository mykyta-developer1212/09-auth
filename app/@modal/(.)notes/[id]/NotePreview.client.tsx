'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

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