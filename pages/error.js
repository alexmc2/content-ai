import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card } from '@material-tailwind/react';

export default function ErrorPage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div className="flex flex-col  prose py-2">

        <div className="flex flex-col my-6 ">
          <div>Error</div>
          <div>{message || 'An unexpected error occurred.'}</div>
        
          <Link href="/">Back to Login</Link>
        </div>
       </div>
    </div>
  );
}
