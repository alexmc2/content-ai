import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@material-tailwind/react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { ClipboardAlert } from './ClipboardAlert';

export function ImageCard({ imageUrl, prompt, onShare, showClipboardAlert }) {
  return (
    <div className="flex justify-center  ">
      <Card className="max-w-xl w-full  pt-2 px-2 mb-20 mt-20 sm:mx-auto mx-2 ">
        <div className="relative pb-4">
          <div className="aspect-w-1 aspect-h-1">
            <img src={imageUrl} alt="Image" className="object-cover border border-8 border-white" />
          </div>
        </div>
        <CardBody>
          <div className=" prose text-base text-left text-black">{prompt}</div>
        </CardBody>
        <CardFooter className="pt-0">
          {showClipboardAlert && <ClipboardAlert />}
          <Button
            className="bg-blue-900 flex mx-auto items-center justify-center w-full mt-2"
            onClick={onShare}
          >
            <ShareIcon className="h-5 w-5 mr-2 " />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
