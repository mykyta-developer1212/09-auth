'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { clientApi } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import styles from './EditProfile.module.css';

interface EditProfileProps {
  user: User;
}

export default function EditProfileClient({ user }: EditProfileProps) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      await clientApi.updateCurrentUser({ username: username.trim() });
      router.push('/profile');
    } catch (err) {
      console.error('Update profile error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <h1 className={styles.formTitle}>Edit Profile</h1>

        <div className={styles.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>

        <form className={styles.profileInfo} onSubmit={handleSubmit}>
          <div className={styles.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}