'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { Note } from '@/types/note';

interface NoteClientProps {
  noteId: string;
}

export default function NoteClient({ noteId }: NoteClientProps) {

  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;

  return (
    <div>
      <h2>{note?.title}</h2>
      <p>{note?.content}</p>
      <span>{note?.tag}</span>
    </div>
  );
}