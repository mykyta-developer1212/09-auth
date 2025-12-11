'use client';

import { ReactNode, useEffect, useState } from 'react';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await clientApi.checkSession();
        if (session) {
          const user = await clientApi.getCurrentUser();
          setUser(user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}