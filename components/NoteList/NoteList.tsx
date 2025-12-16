'use client';

import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import Link from 'next/link';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => clientApi.deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  if (!notes.length) return <p className={styles.empty}>No notes found.</p>;

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            <div className={styles.left}>
              <span className={styles.tag}>{note.tag}</span>

              <Link
                href={`/notes/${note.id}`}
                scroll={false}
                className={styles.view}
              >
                View details
              </Link>
            </div>

            <button
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
              className={styles.button}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}