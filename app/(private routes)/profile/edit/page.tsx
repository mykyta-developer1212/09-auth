import Image from "next/image";
import { serverApi } from "@/lib/api/serverApi";
import type { Metadata } from "next";
import styles from "./EditProfile.module.css";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function ProfilePage() {
  const user = await serverApi.getCurrentUser();

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1 className={styles.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={styles.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={styles.avatar}
            />
          )}
        </div>

        <div className={styles.profileInfo}>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}