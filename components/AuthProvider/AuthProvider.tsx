'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await clientApi.getCurrentUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    checkUser();
  }, [setUser]);

  return <>{children}</>;
}