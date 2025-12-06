'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, AuthState } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((state: AuthState) => state.user);
  const setUser = useAuthStore((state: AuthState) => state.setUser);

  const handleLogout = async () => {
    await clientApi.logout();
    setUser(null);
    router.push('/sign-in');
  };

  if (!user) {
    return (
      <>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/profile">{user.username}</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
}