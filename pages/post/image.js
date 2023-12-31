import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import { ImageSavedAlert } from '../../components/Alert';
import { imagePrompts } from '../../components/ImagePromps';
import { ClipboardAlert } from '../../components/ClipboardAlert';

import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { useState } from 'react';
import Image from 'next/legacy/image';
import { ShareIcon, FolderIcon } from '@heroicons/react/24/outline';

import { Card, Button, Textarea, Alert } from '@material-tailwind/react';
import { Share } from '@next/font/google';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ImagePage() {
  const [prediction, setPrediction] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [showClipboardAlert, setShowClipboardAlert] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);

  const saveImage = async (imageUrl, prompt) => {
    try {
      const response = await fetch('/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image saved with ID:', data.imageId);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);

        // router.push('/imageHistory');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save image.');
      }
    } catch (error) {
      setError('An error occurred while saving the image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl;

    // dummy for testing
    if (e.target.prompt.value === 'dummy') {
      imageUrl =
        'https://res.cloudinary.com/drbz4rq7y/image/upload/v1693765736/cdidt0xbawnlkrx6s85j.png';

      setPrediction({
        output: [imageUrl],
        status: 'succeeded',
      });

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

    // Upload the AI-generated image to Cloudinary
    const cloudinaryResponse = await fetch('/api/uploadToCloudinary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const cloudinaryData = await cloudinaryResponse.json();

    if (!cloudinaryResponse.ok) {
      setError('Failed to upload image to Cloudinary.');
    }
  };

  const setNextPrompt = () => {
    if (promptIndex < imagePrompts.length - 1) {
      setPrompt(imagePrompts[promptIndex + 1]);
      setPromptIndex(promptIndex + 1);
    } else {
      // Reset to the first prompt if we've reached the end of the array
      setPrompt(imagePrompts[0]);
      setPromptIndex(0);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  m-2">
      <Card className="bg-white p-8 border border-sky-100 min-h-screen mx-auto max-w-screen-md flex w-full prose shadow-sm ">
        <div className=" flex flex-col">
          <div className="flex flex-col pt-10 mb-3 mt-2 text-md">
            <div>Describe your desired image</div>
            <Button
              className="my-3 w-52 py-1 text-sm uppercase border border-gray-400 text-gray-600 bg-slate-100 hover:shadow-sm shadow-none"
              onClick={setNextPrompt}
            >
              Try an example prompt
            </Button>
            <div className="text-sm mt-3 -mb-2  text-gray-600">
              {prompt.length}/250
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Textarea
              style={{ fontSize: '1.00rem' }}
              className="bg-slate-100 text-2xl h-48 md:h-32 lg:h-32"
              type="text"
              name="prompt"
              value={prompt}
              placeholder="Provide the AI with descriptive sentence describing your image."
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={250}
            />
            <Button
              className="mb-3 mt-2 text-md py-2 uppercase w-full bg-blue-900"
              type="submit"
              disabled={!prompt.trim()} // Disable the button if prompt is empty or just whitespace
            >
              Generate
            </Button>
          </form>
        </div>

        {error && <div>{error}</div>}

        {prediction && (
          <div>
            <p className="mx-2 mb-2">
              {prediction.status === 'starting' &&
                'Starting image generation... This may take up to a couple of minutes.'}
              {prediction.status === 'processing' &&
                'Processing image... This may take up to a couple of minutes.'}
              {prediction.status === 'succeeded' &&
                'Image generation succeeded!'}
              {prediction.status === 'failed' &&
                'Image generation failed. Please try again.'}
            </p>

            {prediction.output && (
              <div>
                <Image
                  className="w-full object-center object-cover rounded-lg shadow-md"
                  layout="responsive"
                  width={500}
                  height={500}
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                />
                {showAlert && <ImageSavedAlert className="" />}
                {showClipboardAlert && <ClipboardAlert className="" />}

                <div className="flex mt-4 gap-3 ">
                  <Button
                    className="flex-1 text-sm  bg-blue-900"
                    onClick={() =>
                      saveImage(
                        prediction.output[prediction.output.length - 1],
                        prompt
                      )
                    }
                  >
                    Save
                  </Button>
                  <Button
                    className="flex-1 text-sm flex items-center justify-center"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        prediction.output[prediction.output.length - 1]
                      );
                      setShowClipboardAlert(true);
                      setTimeout(() => setShowClipboardAlert(false), 4000);
                    }}
                  >
                    <ShareIcon className="h-5 w-5 mr-2 hide-on-mobile   " />
                    Share
                  </Button>
                </div>
              </div>
            )}
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

    if (!props.availableTokens || props.availableTokens <= 0) {
      return {
        redirect: {
          destination: '/token-topup', // Redirect to  page to top up tokens
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
