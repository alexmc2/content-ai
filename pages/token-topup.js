import { WithPageAuthRequired } from '@auth0/nextjs-auth0';

export default function TokenTopup() {
  return (
    <div>
      <h1>Token Topup</h1>
    </div>
  );
}

export const getServerSideProps = WithPageAuthRequired(() => {
  return {
    props: {
      test: 'this is a test',
    },
  };
});
