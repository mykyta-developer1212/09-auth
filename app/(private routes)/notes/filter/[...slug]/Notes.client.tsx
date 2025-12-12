'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';
import type { Note } from '@/types/note';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const normalizedTag = tag?.toLowerCase() === 'all' ? '' : tag;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, normalizedTag],
    queryFn: () => clientApi.fetchNotes({ page, search: debouncedSearch, tag: normalizedTag }),
  });

  const notes: Note[] = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes: {error instanceof Error ? error.message : 'Unknown'}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create">Create note</Link>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
      )}
    </div>
  );
}