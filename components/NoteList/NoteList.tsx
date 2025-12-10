'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => clientApi.deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.item}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>
          <p>{note.content}</p>
          <span>{note.tag}</span>
          <button
            onClick={() => mutation.mutate(note.id)}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}