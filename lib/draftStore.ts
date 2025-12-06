import { create } from 'zustand';

interface Draft {
  title: string;
  content: string;
  tag: string;
}

interface DraftState {
  draft: Draft;
  setDraft: (draft: Draft) => void;
  resetDraft: () => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  draft: { title: '', content: '', tag: '' },
  setDraft: (draft) => set({ draft }),
  resetDraft: () => set({ draft: { title: '', content: '', tag: '' } }),
}));