import Image from 'next/image';
import { serverApi } from '@/lib/api/serverApi';
import { User } from '@/types/user';
import Link from 'next/link';

export const metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const user: User = await serverApi.getCurrentUser();

  return (
    <div>
      <h1>Profile</h1>
      <Image src={user.avatar} alt={user.username} width={100} height={100} />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Link href="/profile/edit">Edit Profile</Link>
    </div>
  );
}