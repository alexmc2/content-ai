import Link from 'next/link';
import { Card } from '@material-tailwind/react';

export default function Privacy() {
  return (
    <div className="flex justify-center items-center min-h-screen m-2">
      <Card className="bg-white p-10 border border-sky-100 min-h-screen mx-auto max-w-screen-md flex w-full prose shadow-sm ">
        <div className="flex flex-col">
          <h1>Vertex-AI Privacy Policy</h1>

          <h2>The type of personal information we collect</h2>
          <p>We currently collect and process the following information:</p>
          <ul>
            <li>
              Personal identifiers, contacts, and characteristics (e.g., name,
              email, profile picture).
            </li>
            <li>
              Content Data: AI-generated content, including content, title, meta
              description, topic, and keywords.
            </li>
            <li>Image Data: URLs of images uploaded by users.</li>
            <li>
              Usage Data: Number of tokens for each user, indicating content or
              image generation frequency.
            </li>
            <li>
              Session Data: User session information, such as Session ID and
              Last Updated Date.
            </li>
          </ul>

          <h2>How we obtain and use personal information</h2>
          <p>
            Most personal information we process is provided by you when you:
          </p>
          <ul>
            <li>Register an account on Vertex-AI.</li>
            <li>Generate content or images using our AI tools.</li>
            <li>Upload images to our platform.</li>
          </ul>
          <p>We use this information to:</p>
          <ul>
            <li>Provide AI-powered content and image generation services.</li>
            <li>Personalize your platform experience.</li>
            <li>Track usage and offer relevant features.</li>
          </ul>
          <p>
            We may share this data with third-party services like Auth0 for
            authentication and Cloudinary for image storage.
          </p>

          <h2>Legal basis for processing</h2>
          <p>
            Under the UK General Data Protection Regulation (UK GDPR), our
            lawful bases for processing are:
          </p>
          <ul>
            <li>
              (a) Your consent, which you can withdraw at any time by contacting
              Alex McGarry.
            </li>
            <li>
              (b) Our contractual obligation to provide services you've signed
              up for.
            </li>
            <li>
              (f) Our legitimate interest in enhancing our platform and offering
              relevant features.
            </li>
          </ul>

          <h2>Data storage and retention</h2>
          <p>
            Your data is stored securely on our servers and with third-party
            services like Auth0 and Cloudinary. We retain your data as long as
            your account is active or as needed to provide services. Afterward,
            we delete your data from our databases and backups.
          </p>

          <h2>Your rights under data protection law</h2>
          <p>You have rights including:</p>
          <ul>
            <li>Right of access: You can request copies of your data.</li>
            <li>
              Right to rectification: You can ask us to correct inaccurate data
              or complete incomplete data.
            </li>
            <li>
              Right to erasure: You can ask us to delete your data in certain
              situations.
            </li>
            <li>
              Right to restrict processing: You can ask us to limit how we use
              your data in certain situations.
            </li>
            <li>
              Right to object: You can object to our use of your data in certain
              situations.
            </li>
            <li>
              Right to data portability: In certain situations, you can request
              that we transfer your data to another organization or to you.
            </li>
          </ul>
          <p>
            To exercise these rights, contact Alex McGarry. There's no charge
            for these requests, and we aim to respond within a month.
          </p>

          <h2>Contact</h2>
          <div>Name: Alex McGarry</div>
          <div>WhatsApp: 07793 565 433</div>
          <div>
            E-mail:{' '}
            <Link href="mailto:alex_mcgarry@hotmail.co.uk">
              alex_mcgarry@hotmail.co.uk
            </Link>
          </div>
          <div>Date last reviewed: 12th September, 2023</div>
        </div>
      </Card>
    </div>
  );
}
