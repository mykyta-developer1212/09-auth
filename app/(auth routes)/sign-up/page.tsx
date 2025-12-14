'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './SignUpPage.module.css';
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setErrorMsg(error.response?.data?.message ?? 'Registration failed');
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
            className={styles.input}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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