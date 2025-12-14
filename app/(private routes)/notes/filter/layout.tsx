import React, { ReactNode } from "react";

interface NotesFilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode; 
}

export default function NotesFilterLayout({
  children,
  sidebar,
}: NotesFilterLayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <aside>
        {sidebar} 
      </aside>

      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  );
}