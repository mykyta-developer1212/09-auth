'use client';

import { useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await clientApi.fetchNotes();
        setNotes(data.items);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}