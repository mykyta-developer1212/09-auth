'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import cssForm from './NoteForm.module.css';
import cssPage from '@/app/(private routes)/notes/action/create/CreateNote.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const; 
type NoteTag = (typeof TAGS)[number]; 

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

interface NoteStore {
  draft: NoteDraft;
  setDraft: (d: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useDraftStore();

  const mutation = useMutation({
    mutationFn: clientApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      if (onSuccess) onSuccess();
      else router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: draft.title,
      content: draft.content,
      tag: draft.tag || 'Todo',
    };
    mutation.mutate(payload);
  };

  const isSubmitting = mutation.status === 'pending'; 

  return (
    <main className={cssPage.main}>
      <div className={cssPage.container}>
        <h1 className={cssPage.title}>Create Note</h1>
        <form className={cssForm.form} onSubmit={handleSubmit}>
          <input
            className={cssForm.input}
            value={draft.title}
            onChange={(e) => setDraft({ title: e.target.value })}
            placeholder="Title"
            required
          />

          <textarea
            className={cssForm.textarea}
            value={draft.content}
            onChange={(e) => setDraft({ content: e.target.value })}
            placeholder="Content"
            required
          />

          <select
            className={cssForm.select}
            value={draft.tag}
            onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
          >
            <option value="">Select tag</option>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <div className={cssForm.actions}>
            <button type="submit" className={cssForm.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              className={cssForm.cancelButton}
              onClick={onCancel ?? (() => router.back())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}