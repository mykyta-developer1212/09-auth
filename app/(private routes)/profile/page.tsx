'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <Link href="/profile/edit">Edit Profile</Link>
    </div>
  );
}
