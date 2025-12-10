'use client';

import { ReactNode, useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    clientApi.checkSession()
      .then((user) => setUser(user))
      .finally(() => setLoading(false));
  }, [setUser]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}