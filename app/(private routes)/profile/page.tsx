import { serverApi } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const user = await serverApi.getCurrentUser();

  return (
    <div>
      <Image
        src={user.avatar || '/default-avatar.png'}
        alt="avatar"
        width={100}
        height={100}
      />
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <Link href="/profile/edit">Edit Profile</Link>
    </div>
  );
}