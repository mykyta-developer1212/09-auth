'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState(user?.username || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser = await clientApi.updateProfile({ username });
    setUser(updatedUser);
    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input type="email" value={user?.email || ''} readOnly placeholder="Email" />
      {user?.avatar && (
        <Image src={user.avatar} alt="avatar" width={100} height={100} />
      )}
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.back()}>Cancel</button>
    </form>
  );
}