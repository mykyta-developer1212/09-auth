import NotesClient from './Notes.client';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { NoteTag } from '@/types/note';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tag =
    slug && slug.length > 0 ? (slug[0] as NoteTag) : undefined;

  return (
    <TanStackProvider>
      <NotesClient tag={tag} />
    </TanStackProvider>
  );
}