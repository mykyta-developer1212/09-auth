'use client';

import { useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import { useAuth } from '@/components/AuthProvider/AuthProvider';

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await clientApi.patch('/api/users/me', { username, email });
    setUser(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Save</button>
    </form>
  );
}