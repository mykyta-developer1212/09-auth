'use client';

import Link from 'next/link';
import { useAuth } from '../AuthProvider/AuthProvider';
import styles from './AuthNavigation.module.css';

export const AuthNavigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </>
      )}
    </nav>
  );
};