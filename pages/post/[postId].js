import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Post() {
  return (
    <div>
      <h1>POST</h1>
      <p>post</p>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {
      test: 'this is a test',
    },
  };
});
