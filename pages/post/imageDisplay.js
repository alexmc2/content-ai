import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';

import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { getAppProps } from '../../utils/getAppProps';
import { Card } from '@material-tailwind/react';

export default function ImageDisplay() {
  const router = useRouter();
  const imageUrl = decodeURIComponent(router.query.imageUrl || '');

  return (
    <div>
      <Card className="bg-white/60 p-8 border border-sky-100 my-8 mx-auto max-w-screen-md flex flex-col w-full prose shadow-sm ">
        <Image
          className="w-full object-center rounded-sm"
          layout="responsive"
          src={imageUrl}
          alt="Generated Image"
          width={500}
          height={500}
        />
      </Card>
    </div>
  );
}

ImageDisplay.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
