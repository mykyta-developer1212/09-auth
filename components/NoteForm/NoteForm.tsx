'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/draftStore';
import cssForm from './NoteForm.module.css';
import cssPage from '@/app/(private routes)/notes/action/create/CreateNote.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, resetDraft } = useDraftStore();

  const mutation = useMutation({
    mutationFn: clientApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraft();
      if (onSuccess) onSuccess();
      else router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <main className={cssPage.main}>
      <div className={cssPage.container}>
        <h1 className={cssPage.title}>Create Note</h1>
        <form className={cssForm.form} onSubmit={handleSubmit}>
          <input
            className={cssForm.input}
            value={draft.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Title"
            required
          />

          <textarea
            className={cssForm.textarea}
            value={draft.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ ...draft, content: e.target.value })}
            placeholder="Content"
            required
          />

          <select
            className={cssForm.select}
            value={draft.tag}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ ...draft, tag: e.target.value })}
          >
            <option value="">Select tag</option>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <div className={cssForm.actions}>
            <button type="submit" className={cssForm.submitButton}>
              Create
            </button>
            <button type="button" className={cssForm.cancelButton} onClick={onCancel ?? (() => router.back())}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}