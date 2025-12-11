"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";
import { useDraftStore } from "@/lib/draftStore";
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

  const createMutation = useMutation({
    mutationFn: clientApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setDraft({ title: "", content: "", tag: "" });
      onSuccess?.();
    },
  });

  const updateMutation = useMutation({
    mutationFn: clientApi.updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && note) {
      updateMutation.mutate({
        id: note.id,
        title: note.title,
        content: note.content,
        tag: note.tag,
      });
    } else {
      createMutation.mutate(draft);
    }
  };

  const value = isEditing ? note : draft;

  const handleChange = (field: "title" | "content" | "tag", val: string) => {
    if (isEditing && note) {
      note[field] = val;
    } else {
      setDraft({ ...draft, [field]: val });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          type="text"
          value={value.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          value={value.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          value={value.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
        >
          <option value="">Select tag</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          {isEditing ? "Update Note" : "Create Note"}
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel ?? (() => router.back())}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
