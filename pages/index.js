import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function Home() {
  const { user } = useUser();
  console.log('🚀 ~ file: index.js:6 ~ Home ~ user:', user);

  return (
    <div>
      <h1>Home</h1>
      <div>
        {!!user ? (
          <>
            <div>
              <Image
                src={user.picture}
                alt={user.name}
                width={50}
                height={50}
              />
              <div>{user.email}</div>
               
              <p>{user.name}</p>
            </div>
            <Link href="api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
}
