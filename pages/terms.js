import Link from 'next/link';
import { Card } from '@material-tailwind/react';

export default function TermsOfService() {
  return (
    <div className="flex justify-center items-center min-h-screen m-2">
      <Card className="bg-white p-10 border border-sky-100 min-h-screen mx-auto max-w-screen-md flex w-full prose shadow-sm ">
        <div className="flex flex-col">
          <h1>Vertex-AI Terms of Service</h1>
          <p>Last Updated: 12th September, 2023</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Vertex-AI. By using our app, you agree to these Terms of
            Service. Please read them carefully.
          </p>

          <h2>2. Access and Use</h2>
          <ul>
            <li>
              Eligibility: You must be at least 13 years old to use our app.
            </li>
            <li>
              Access: We grant you a limited, non-exclusive, non-transferable,
              and revocable license to use our app for personal, non-commercial
              purposes.
            </li>
          </ul>

          <h2>3. Sandbox Tokens</h2>
          <ul>
            <li>
              Acquisition: Users can acquire tokens through a sandbox account,
              which are for demonstration purposes only and have no real-world
              value.
            </li>
            <li>
              Usage: Tokens can be used within the app to access specific
              features or content. They cannot be exchanged for real money,
              goods, or services outside of the app.
            </li>
          </ul>

          <h2>4. Restrictions</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the app for any illegal activities.</li>

            <li>
              Resell, barter, trade, or exploit for any commercial purposes any
              portion of the app.
            </li>
          </ul>

          <h2>5. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the app
            without prior notice for violations of these Terms or for any other
            reason we deem necessary.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            Vertex-AI is provided "as is" without any warranties, either express
            or implied. We do not guarantee that it will always be safe, secure,
            or error-free, nor do we guarantee that it will always function
            without disruptions, delays, or imperfections.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Vertex-AI shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses.
          </p>

          <h2>8. Changes to These Terms</h2>
          <p>
            We may modify these Terms at any time. If we make changes, we will
            notify you by updating the date at the top of this page.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the United Kingdom, without regard to its conflict of law
            principles.
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
