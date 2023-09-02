import Link from 'next/link';
import { Logo } from '../components/logo/Logo';
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
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center  ">
      <video
        className="fixed top-0 left-0 min-w-full min-h-full z-negative object-cover"
        autoPlay
        muted
        loop
      >
        <source src={require('../public/galaxy2.mp4')} type="video/mp4" />
      </video>
      <div className="relative z-10 text-white sm:px-10 px-7 text-center max-w-screen-md font-bold flex flex-col items-center">
        <div className="sm:text-7xl md:text-8xl text-5xl sm:py-5 py-4">
          VERTEX AI
        </div>
        <div className="sm:text-3xl text-xl px-2 w-full mb-5 font-light">
          An AI-powered platform for content and image creation
        </div>
        <Link href="/home">
          <Button className="px-20 text-lg sm:my-12 my-10 bg-blue-600/60">
            ENTER
          </Button>
        </Link>
      </div>
    </div>
  );
}
