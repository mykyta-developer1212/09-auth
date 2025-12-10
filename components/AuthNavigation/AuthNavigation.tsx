'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      router.push('/sign-in');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  if (!user) {
    return (
      <>
        <li className={styles.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={styles.navigationLink}>
            Sign in
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={styles.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={styles.navigationItem}>
        <Link href="/profile" prefetch={false} className={styles.navigationLink}>
          {user.username}
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );
}