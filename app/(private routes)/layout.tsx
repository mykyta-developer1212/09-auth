import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function PrivateLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}