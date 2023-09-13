import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card } from '@material-tailwind/react';

export default function ErrorPage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div className="flex flex-col  prose py-2">
      {/* <div className="bg-white p-10 border border-sky-100 min-h-screen mx-auto max-w-screen-md flex w-full prose shadow-sm "> */}
        <div className="flex flex-col my-6 ">
          <div>Error</div>
          <div>{message || 'An unexpected error occurred.'}</div>
          {/* You can add a button or link to redirect the user to the homepage or another relevant page */}
          <Link href="/">Back to Login</Link>
        </div>
       </div>
    </div>
  );
}
