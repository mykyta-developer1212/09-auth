'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill all fields');
      return;
    }

    try {
      const user = await clientApi.register(email, password);
      setUser(user);
      router.push('/profile');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMsg(error.response?.data?.message ?? 'Registration failed');
      console.error(err);
    }
  };

  return (
    <main className={styles.mainContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.formTitle}>Sign Up</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </main>
  );
}