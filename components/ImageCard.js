import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@material-tailwind/react';
import { ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ClipboardAlert } from './ClipboardAlert';
import { ImageDeletedAlert } from './ImageDeletedAlert';

export function ImageCard({
  imageUrl,
  prompt,
  onShare,
  onDelete,
  showClipboardAlert,
  showDeleteAlert, // Add this prop
}) {
  return (
    <div className="flex justify-center  ">
      <Card className="max-w-xl w-full  pt-2 px-2 mb-20 mt-20 sm:mx-auto mx-2 rounded-lg">
        <div className="relative pb-4">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={imageUrl}
              alt="Image"
              className="object-cover border border-8 border-white"
            />
          </div>
        </div>
        <CardBody>
          <div className=" prose text-base text-left text-black">{prompt}</div>
        </CardBody>
        <CardFooter className="pt-0">
          {showClipboardAlert && <ClipboardAlert />}
          {showDeleteAlert && <ImageDeletedAlert />}
          <div className="flex mt-2 gap-3 w-full">
            <Button
              className="flex-1 gap-1 sm:text-sm text-xs flex items-center justify-center bg-blue-900"
              onClick={onShare}
            >
              <ShareIcon className="w-5 -h-5 mr-2 hide-on-mobile" />
              Share
            </Button>
            <Button
              className="bg-red-600 sm:text-sm text-xs flex items-center justify-center w-1/2"
              onClick={onDelete}
            >
              <TrashIcon className="h-5 w-5 mr-2 hide-on-mobile" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
