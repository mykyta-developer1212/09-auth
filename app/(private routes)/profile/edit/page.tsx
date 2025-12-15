'use client';

import { useEffect, useState } from 'react';
import EditProfileClient from './EditProfileClient';
import { clientApi } from '@/lib/api/clientApi';
import type { User } from '@/types/user';

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    clientApi.getCurrentUser().then(setUser).catch(console.error);
  }, []);

  if (!user) return <p>Loading...</p>;

  return <EditProfileClient user={user} />;
}