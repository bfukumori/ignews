import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider } from 'next-auth/react';

import '../styles/global.scss';
import { PrismicProvider } from '@prismicio/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </PrismicProvider>
  )
}
