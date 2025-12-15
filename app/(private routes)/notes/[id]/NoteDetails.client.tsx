'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Note not found</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </div>
  );
}