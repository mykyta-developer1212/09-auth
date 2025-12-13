'use client';

import { useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void;
}

export default function NotePreviewClient({ noteId, onClose }: NotePreviewProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data: Note = await clientApi.getNoteById(noteId);
        setNote(data);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [noteId]);

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <NoteForm
      note={note}
      onSuccess={onClose}
      onCancel={onClose}
    />
  );
}