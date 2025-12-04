"use client";

import React, { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api/clientApi";
import { Note } from "@/types/note";

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNote() {
      try {
        const data: Note = await fetchNoteById(id);
        setNote(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch note");
        }
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
      <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
      <p>Updated at: {new Date(note.updatedAt).toLocaleString()}</p>
    </div>
  );
}