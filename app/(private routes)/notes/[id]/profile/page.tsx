import { Metadata } from "next";
import css from "./Profile.module.css";

export const metadata: Metadata = {
  title: "NoteHub - Profile",
  description: "Welcome to NoteHub. Manage your personal notes efficiently.",
  openGraph: {
    title: "NoteHub - Profile",
    description:
      "Welcome to NoteHub. NoteHub is a simple and efficient application designed for managing personal notes. Keep your thoughts organized and accessible.",
    url: "https://08-zustand-lilac-six.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 800,
        height: 600,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="#" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <img
            src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" // приклад аватара
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}