'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/draftStore';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Draft {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft } = useDraftStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (note: Draft) => clientApi.createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDraft({ title: '', content: '', tag: '' });
      if (onSuccess) onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft as Draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
      />
      <select
        value={draft.tag}
        onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
      >
        <option value="">Select tag</option>
        {TAGS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel ?? (() => router.back())}>
        Cancel
      </button>
    </form>
  );
}