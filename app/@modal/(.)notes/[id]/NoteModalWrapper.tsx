'use client';

import NotePreviewClient from './NotePreview.client';
import NoteCreateClient from './create/NoteCreate.client';
import { usePathname } from 'next/navigation';

export default function NoteModalWrapper() {
  const pathname = usePathname();

  const pathParts = pathname.split('/');
  const noteId = pathParts[pathParts.length - 1]; 
  const create = pathname.includes('create');

  if (!noteId && !create) return null;

  const handleClose = () => history.back();

  if (noteId && !create) return <NotePreviewClient noteId={noteId} onClose={handleClose} />;
  if (create) return <NoteCreateClient onClose={handleClose} />;

  return null;
}