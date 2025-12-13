'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/draftStore';
import css from './NoteForm.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, resetDraft } = useDraftStore();

  const mutation = useMutation({
    mutationFn: clientApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraft();
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        value={draft.title}
        onChange={e => setDraft({ ...draft, title: e.target.value })}
      />

      <textarea
        value={draft.content}
        onChange={e => setDraft({ ...draft, content: e.target.value })}
      />

      <select
        value={draft.tag}
        onChange={e => setDraft({ ...draft, tag: e.target.value })}
      >
        <option value="">Select tag</option>
        {TAGS.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <button type="submit">Create</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}