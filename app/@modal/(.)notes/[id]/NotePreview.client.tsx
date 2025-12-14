'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void; 
}

export default function NotePreviewClient({ noteId, onClose }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Note not found</p>;

  const handleClose = onClose ?? (() => router.back());

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>

      <button onClick={handleClose}>Close</button>
    </Modal>
  );
}