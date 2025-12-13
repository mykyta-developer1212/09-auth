"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";
import { useDraftStore } from "@/lib/draftStore";
import { useState } from "react";
import css from "./NoteForm.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface NoteFormProps {
  note?: {
    id: string;
    title: string;
    content: string;
    tag: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NoteForm({ note, onSuccess, onCancel }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft } = useDraftStore();
  const queryClient = useQueryClient();

  const isEditing = Boolean(note);

  const [localNote, setLocalNote] = useState({
    id: note?.id ?? "",
    title: note?.title ?? "",
    content: note?.content ?? "",
    tag: note?.tag ?? "",
  });

  const createMutation = useMutation({
    mutationFn: clientApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setDraft({ title: "", content: "", tag: "" });
      onSuccess?.();
    },
  });

  const value = isEditing ? localNote : draft;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) return;

    createMutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  const handleChange = (field: "title" | "content" | "tag", val: string) => {
    if (isEditing) {
      setLocalNote(prev => ({ ...prev, [field]: val }));
    } else {
      setDraft({
        title: field === "title" ? val : draft.title,
        content: field === "content" ? val : draft.content,
        tag: field === "tag" ? val : draft.tag,
      });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        value={value.title}
        onChange={e => handleChange("title", e.target.value)}
      />
      <textarea
        value={value.content}
        onChange={e => handleChange("content", e.target.value)}
      />
      <select
        value={value.tag}
        onChange={e => handleChange("tag", e.target.value)}
      >
        <option value="">Select tag</option>
        {TAGS.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <button type="submit">
        {isEditing ? "Update" : "Create"}
      </button>

      <button type="button" onClick={onCancel ?? (() => router.back())}>
        Cancel
      </button>
    </form>
  );
}