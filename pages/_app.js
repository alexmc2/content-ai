import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PostsProvider } from '../context/postsContext';

import {
  DM_Sans,
  Roboto,
  Inter,
  Raleway,
  Roboto_Mono,
} from '@next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider } from '@material-tailwind/react';

const roboto_Mono = Roboto_Mono({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      <UserProvider>
        <PostsProvider>
        <main
          className={`${inter.variable} font-heading ${inter.variable} font-body`}
        >
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
        </PostsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
