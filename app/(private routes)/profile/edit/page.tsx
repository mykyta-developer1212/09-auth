'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser = await clientApi.updateProfile({ username, email, avatar });
    setUser(updatedUser);
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Avatar URL" />
      <button type="submit">Save</button>
    </form>
  );
}