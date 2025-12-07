'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientApi, GetNotesResponse } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<GetNotesResponse, Error>({
    queryKey: ['notes', page, search, tag],
    queryFn: () => clientApi.getNotes({ page, search, tag }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={data?.items || []} />
      <Pagination
      totalPages={data?.totalPages || 1}  
      currentPage={page}                  
      onPageChange={setPage}              
      />
    </div>
  );
}