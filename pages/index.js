import Link from 'next/link';
import { Logo } from '../components/AppLayout/logo/Logo';
import { useRouter } from 'next/router';
import { Button } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/post/new');
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative body-home">
      <div className="relative z-10 text-white px-10 py-8 mx-3 text-center max-w-screen-md bg-slate-900/80 rounded-xl backdrop-blur-sm font-bold ">
        <Logo />
        {/* <FontAwesomeIcon icon={faBrain} className="text-white-500 px-3" /> */}
        <div className="text-xl font-normal py-4">
          The AI-powered SAAS platform for content and image creation
        </div>
        <Button
          color="green"
          className="px-10 w-full text-md mt-4 "
          onClick={handleNavigation}
        >
          Begin
        </Button>
      </div>
    </div>
  );
}
