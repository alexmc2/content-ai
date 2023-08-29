import Link from 'next/link';
import { Logo } from '../components/AppLayout/logo/Logo';
import { Button } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  console.log('Is loading:', isLoading);
  console.log('Error:', error);
  console.log('User:', user);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative body-home">
      <div className="relative z-10 text-white px-10 py-8 mx-3 text-center max-w-screen-md bg-slate-900/80 rounded-xl backdrop-blur-sm font-bold ">
        <Logo />
        {/* <FontAwesomeIcon icon={faBrain} className="text-white-500 px-3" /> */}
        <div className="text-xl font-normal py-4">
          The AI-powered SAAS platform for content and image creation
        </div>
        <Link href="/post/new">
          <div className="btn px-10 w-full text-md mt-4 text-left bg-green-500 hover:bg-green-600 rounded">
            Begin
          </div>
        </Link>
      </div>
    </div>
  );
}
