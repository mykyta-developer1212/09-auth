import { create } from "zustand";

export type NoteDraft = {
  title: string;
  content: string;
  tag: string;
};

export const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: NoteDraft;
  setDraft: (d: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  draft: initialDraft,
  setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
  clearDraft: () => set({ draft: initialDraft }),
}));