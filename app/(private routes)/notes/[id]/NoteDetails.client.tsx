'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { Note } from '@/types/note';

interface NoteDetailsProps {
  note?: Note;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', note?.id],
    queryFn: () => clientApi.getNoteById(note!.id), 
    enabled: !!note,
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