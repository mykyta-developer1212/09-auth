'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import type { Note } from '@/types/note';
import { useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void;
}

export default function NotePreviewClient({ noteId, onClose }: NotePreviewProps) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await clientApi.getNoteById(noteId);
      setNote(data);
    };
    fetchNote();
  }, [noteId]);

  if (!note) return <p>Loading...</p>;

  return <NoteForm note={note} onSuccess={onClose} onCancel={onClose} />;
}