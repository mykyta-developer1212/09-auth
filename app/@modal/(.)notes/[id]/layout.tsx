import { ReactNode } from "react";
import NotePreviewClient from "./NotePreview.client";

interface NotesLayoutProps {
  children: ReactNode;
  params: { id: string };
}

export default function NotesLayout({ children, params }: NotesLayoutProps) {
  return (
    <>
      {children}
      <NotePreviewClient noteId={params.id} />
    </>
  );
}