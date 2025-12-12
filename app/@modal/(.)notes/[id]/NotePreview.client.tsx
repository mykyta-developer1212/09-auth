'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import type { Note } from '@/types/note';
import { useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';

interface NotePreviewProps {
  note?: Note;   
  noteId?: string;    
  onClose?: () => void;
}

export default function NotePreviewClient({ note, noteId, onClose }: NotePreviewProps) {
  const [loadedNote, setLoadedNote] = useState<Note | null>(note ?? null);

  useEffect(() => {
    if (!note && noteId) {
      const fetchNote = async () => {
        const data = await clientApi.getNoteById(noteId);
        setLoadedNote(data);
      };
      fetchNote();
    }
  }, [note, noteId]);

  if (!loadedNote) return <p>Loading...</p>;

  return (
    <NoteForm
      note={loadedNote}
      onSuccess={onClose}
      onCancel={onClose}
    />
  );
}