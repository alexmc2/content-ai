import { CldUploadWidget } from 'next-cloudinary';

export default function UploadWidget() {
  return (
    <CldUploadWidget uploadPreset="photon">
      {({ open }) => <button onClick={open}>Save Image</button>}
    </CldUploadWidget>
  );
}
