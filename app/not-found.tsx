import css from "./not-found.module.css";

export const metadata = {
  title: "NoteHub - Page Not Found",
  description: "Sorry, the page you are looking for does not exist on NoteHub.",
  url: "https://07-routing-nextjs-8hgj.vercel.app/not-found", 
  openGraph: {
    title: "NoteHub - Page Not Found",
    description: "Sorry, the page you are looking for does not exist on NoteHub.",
    url: "https://07-routing-nextjs-8hgj.vercel.app/not-found", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Page Image",
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}