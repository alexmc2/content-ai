import '../styles/globals.css';
import { useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PostsProvider } from '../context/postsContext';
import { ImagesProvider } from '../context/imagesContext';
import { SidebarContext } from '../context/sidebarContext';
import { ExtendedUserProvider } from '../context/userContext';

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

  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <UserProvider>
        <ExtendedUserProvider>
          <PostsProvider>
            <ImagesProvider>
              <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
                <main
                  className={`${inter.variable} font-heading ${inter.variable} font-body`}
                >
                  {getLayout(<Component {...pageProps} />, pageProps)}
                </main>
              </SidebarContext.Provider>
            </ImagesProvider>
          </PostsProvider>
        </ExtendedUserProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
