'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import styles from './NoteDetails.module.css';

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Note not found</p>;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <span className={styles.tag}>{note.tag}</span>
    </div>
  );
}