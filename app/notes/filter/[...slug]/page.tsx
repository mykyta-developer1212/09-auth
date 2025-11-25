import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: { slug: string[] };
}

export default function NotesPage({ params }: PageProps) {
  const tag = params.slug?.[0] as NoteTag | undefined;

  return <NotesClient tag={tag} />;
}