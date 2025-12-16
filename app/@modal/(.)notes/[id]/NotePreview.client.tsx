'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import styles from '@/components/NoteList/NoteList.module.css';

interface Props {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => clientApi.getNoteById(noteId),
  });

  if (isLoading) return null;
  if (isError || !note) return null;

  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <Modal>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <p className={styles.content}>{note.tag}</p>
      <p className={styles.content}>Created at: {formattedDate}</p>
      <button
        className={styles.button}
        onClick={() => router.back()}
      >
        Close
      </button>
    </Modal>
  );
}
