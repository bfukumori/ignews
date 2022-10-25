import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { PrismicProvider } from '@prismicio/react';
import type { Session } from 'next-auth';

import { Header } from '../components/Header';
import '../styles/global.scss';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <PrismicProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </PrismicProvider>
  );
}
