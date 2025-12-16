'use client';

import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
}