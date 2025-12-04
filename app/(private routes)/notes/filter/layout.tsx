import React, { ReactNode } from "react";

interface NotesFilterLayoutProps {
  children: ReactNode;
}

export default function NotesFilterLayout({ children }: NotesFilterLayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      {children}
    </div>
  );
}