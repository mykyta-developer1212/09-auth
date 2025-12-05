'use client';

import { useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import { Note, NoteTag } from '@/types/note';

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await clientApi.get<Note[]>('/api/notes');
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  const filteredNotes = tag ? notes.filter((note) => note.tag === tag) : notes;

  return (
    <div>
      {filteredNotes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}