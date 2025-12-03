"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export default function NotePage() {
  const params = useParams();
  const noteId = params.id as string;

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNote() {
      try {
        const data = await fetchNoteById(noteId);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    }

    if (noteId) {
      getNote();
    }
  }, [noteId]);

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </main>
  );
}