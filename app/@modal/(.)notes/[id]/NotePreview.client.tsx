'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  return <NoteContent noteId={noteId} />;
}

function NoteContent({ noteId }: { noteId: string }) {
  const { data, isLoading, error } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;

  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
      <span>{data?.tag}</span>
    </div>
  );
}