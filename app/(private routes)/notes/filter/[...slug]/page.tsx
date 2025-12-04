import NotesClient from "./Notes.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: { slug?: string[] };
}

export default function NotesPage({ params }: PageProps) {
  const slug = params?.slug;
  const tag = slug && slug.length > 0 ? (slug[0] as NoteTag) : undefined;

  return (
    <TanStackProvider>
      <NotesClient tag={tag} />
    </TanStackProvider>
  );
}