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
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <video
        className="fixed top-0 left-0 min-w-full min-h-full z-negative object-cover"
        autoPlay
        muted
        loop
      >
        <source
          src="https://res.cloudinary.com/drbz4rq7y/video/upload/v1693663718/galaxy2_tdbfn2.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 text-white sm:px-2 md:px-3 px-4 text-center sm:max-w-screen-md max-w-screen-sm font-bold flex flex-col items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <span className="sm:text-7xl md:text-xl lg:text-8xl text-5xl sm:py-5 py-4 flex-grow text-center">
            VERTEX AI
          </span>
          <span className="sm:text-2xl text-xl sm:px-6 px-11 w-full mb-5 font-light flex-grow text-center">
            AI-powered content and image creation
          </span>
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
