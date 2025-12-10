import { serverApi } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const user = await serverApi.getCurrentUser();

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1 className={styles.formTitle}>Profile</h1>
          <Link href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={styles.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.usernameWrapper}>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </main>
  );
}