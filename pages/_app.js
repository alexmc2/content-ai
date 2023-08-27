import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DM_Sans, Roboto, Inter } from '@next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider } from '@material-tailwind/react';




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
        <main className={`${inter.variable} ${inter.variable} font-body`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
