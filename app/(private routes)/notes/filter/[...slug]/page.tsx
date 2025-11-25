import { dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/api";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: PageProps) {
  const tag = params.slug?.[0] as NoteTag | undefined;

  const title = tag ? `${tag} notes – NoteHub` : "All notes – NoteHub";
  const description = tag ? `Browse all your ${tag} notes in NoteHub.` : "Browse all your notes in NoteHub.";

  return { title, description, openGraph: { title, description } };
}

export default async function NotesPage({ params }: PageProps) {
  const tag = params.slug?.[0] as NoteTag | undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 10, search: "", tag }),
  });

  return <NotesClient tag={tag} dehydratedState={dehydrate(queryClient)} />;
}