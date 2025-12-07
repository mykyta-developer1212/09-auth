'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';

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
    <div className="modal">
      <div className="modal-content">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  );
}