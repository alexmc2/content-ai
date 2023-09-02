import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { useState } from 'react';
import Image from 'next/image';
import { Card, Button, Textarea } from '@material-tailwind/react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ImagePage() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl; // Declare imageUrl here

    // dummy for testing
    if (e.target.prompt.value === 'dummy') {
      imageUrl =
        'https://res.cloudinary.com/drbz4rq7y/image/upload/v1693677797/replicate-prediction-yljh2ddbnfawxbfnetxcesptkm_iztsqn.png';
      router.push(
        `/post/imageDisplay?imageUrl=${encodeURIComponent(imageUrl)}`
      );
      return;
    }

    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
    imageUrl = prediction.output[prediction.output.length - 1];

    router.push(`/imageDisplay?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="flex justify-center py-10 ">
      <Card className="bg-white/60 p-8 border border-sky-100 my-8 mx-auto max-w-screen-md flex flex-col w-full prose shadow-sm ">
        <div className=" flex flex-col">
          <form onSubmit={handleSubmit}>
            <Textarea
              className="bg-white"
              type="text"
              name="prompt"
              placeholder="Enter a prompt to display an image"
            />
            <Button type="submit"> Generate Image </Button>
          </form>
        </div>

        {error && <div>{error}</div>}

        {prediction && (
          <div>
            {prediction.output && (
              <div>
                <Image
                  className="w-full object-center rounded-sm"
                  layout="responsive"
                  width={500}
                  height={500}
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                />
              </div>
            )}
            <p>status: {prediction.status}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

ImagePage.getLayout = function getLayout(page, pageProps) {
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
