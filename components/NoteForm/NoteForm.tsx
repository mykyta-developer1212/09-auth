"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNotePayload } from "@/lib/api/api";
import type { Note } from "@/types/note";
import { useNoteStore, type NoteDraft, initialDraft } from "@/lib/store/noteStore";
import { NoteTag } from "@/types/note";
import { useEffect } from "react";
import styles from "./NoteForm.module.css";

export interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(TAGS)
    .required("Tag is required"),
});

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  useEffect(() => {
    if (!draft) setDraft(initialDraft);
  }, [draft, setDraft]);

  const mutation = useMutation<Note, Error, CreateNotePayload>({
    mutationFn: (payload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onSuccess?.();
    },
  });

  const initialValues: NoteDraft = draft ?? initialDraft;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFieldValue: FormikHelpers<NoteDraft>["setFieldValue"]
  ) => {
    const { name, value } = e.target;
    setFieldValue(name as keyof NoteDraft, value);
    setDraft({ ...draft, [name]: value } as NoteDraft);
  };

  const handleSubmit = (values: NoteDraft, helpers: FormikHelpers<NoteDraft>) => {
    const payload: CreateNotePayload = {
      title: values.title,
      content: values.content,
      tag: values.tag as NoteTag, 
    };

    mutation.mutate(payload, {
      onSettled: () => {
        helpers.setSubmitting(false);
        helpers.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              className={styles.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, setFieldValue)
              }
              value={draft.title}
            />
            <ErrorMessage name="title" component="span" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={6}
              className={styles.textarea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e, setFieldValue)
              }
              value={draft.content}
            />
            <ErrorMessage name="content" component="span" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              as="select"
              id="tag"
              name="tag"
              className={styles.select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(e, setFieldValue)
              }
              value={draft.tag}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={styles.error} />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}