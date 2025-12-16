'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { clientApi, GetNotesResponse } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import noteFormStyles from '@/components/NoteForm/NoteForm.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const normalizedTag = tag?.toLowerCase() === 'all' ? '' : tag;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 0);
    return () => clearTimeout(t);
  }, [normalizedTag, debouncedSearch]);

  const { data, isLoading, isError, error } = useQuery<GetNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, normalizedTag],
    queryFn: () =>
      clientApi.getNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
    staleTime: 1000 * 60,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading notes...</p>;
  if (isError)
    return (
      <p>
        Error loading notes:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <SearchBox value={search} onChange={setSearch} />

        <Link
          href="/notes/action/create"
          className={noteFormStyles.submitButton}
          style={{ textDecoration: 'none', fontWeight: 500, fontFamily: 'inherit' }}
        >
          Create note
        </Link>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
      )}
    </div>
  );
}