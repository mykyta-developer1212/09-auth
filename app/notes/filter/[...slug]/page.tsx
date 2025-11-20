import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/api";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;

  const tag = slug?.[0] as NoteTag | undefined;

  const title = tag ? `${tag} notes – NoteHub` : "All notes – NoteHub";
  const description = tag
    ? `Browse all your ${tag} notes in NoteHub.`
    : "Browse all your notes in NoteHub.";

  const url = `https://07-routing-nextjs-8hgj.vercel.app/notes/filter/${tag ?? "all"}`;
  const images = [
    {
      url: "https://07-routing-nextjs-8hgj.vercel.app/https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub preview",
    },
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images,
    },
  };
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const tag = slug?.[0] as NoteTag | undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, search: "", tag, perPage: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}