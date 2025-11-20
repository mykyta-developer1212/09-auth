import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"], 
  subsets: ["latin"], 
  display: "swap", 
  variable: "--font-roboto",
});

export const metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a simple and efficient application for managing personal notes, helping you keep your thoughts organized and accessible.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub is a simple and efficient application for managing personal notes. Organize your thoughts and access them anytime, anywhere.",
    url: "https://07-routing-nextjs-8hgj.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

