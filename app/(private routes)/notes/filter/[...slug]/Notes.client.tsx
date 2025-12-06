'use client';

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NotesResponse {
  items: Note[];
  totalPages: number;
}

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [tagFilter, setTagFilter] = useState('');
  const queryClient = useQueryClient();

  const { data: notes, isLoading } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', page, search, tagFilter],
    queryFn: () => clientApi.getNotes({ page, search, tag: tagFilter }),
  });

  useEffect(() => {
    if (notes && page < notes.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['notes', page + 1, search, tagFilter],
        queryFn: () =>
          clientApi.getNotes({ page: page + 1, search, tag: tagFilter }),
      });
    }
  }, [notes, page, search, tagFilter, queryClient]);

  return (
    <div>
      <h1>Notes</h1>

      <SearchBox
        value={search}
        onChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
      />

      <div style={{ margin: '10px 0' }}>
        <label>Filter by Tag: </label>
        <select
          value={tagFilter}
          onChange={(e) => {
            setPage(1);
            setTagFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? <p>Loading...</p> : <NoteList notes={notes?.items || []} />}

      {notes && notes.totalPages > 1 && (
        <Pagination
          pageCount={notes.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}