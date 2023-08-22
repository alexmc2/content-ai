import Link from 'next/link';
import { Logo } from '../components/AppLayout/logo/Logo';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative body-home">
      <div className="relative z-10 text-white px-10 py-5 mx-3 text-center max-w-screen-md bg-slate-900/80 rounded-xl backdrop-blur-sm font-bold">
        <Logo />
        <div className="text-xl font-normal pb-5">
          The AI-powered SAAS platform for content and image creation
        </div>
        <Link href="/post/new" className="btn ">
          Begin
        </Link>
      </div>
    </div>
  );
}
