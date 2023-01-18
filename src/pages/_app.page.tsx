/* eslint-disable @typescript-eslint/ban-types */
import ProgressBar from '@badrap/bar-of-progress';
import {AppProviders} from '@providers/app-providers';
import '@styles/globals.css';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {Router} from 'next/router';
import type {ReactElement, ReactNode} from 'react';

import {CookieConsentBanner} from '@components/cookie-consent-banner/cookie-consent-banner';
import {DefaultSeo} from '@components/default-seo/default-seo';

const progress = new ProgressBar({
  size: 2,
  className: 'bar-of-progress',
  delay: 100,
  color: '#354CD0',
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', () => {
  progress.finish();
  window.scrollTo(0, 0);
  Router.events.on('routeChangeError', progress.finish);
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <DefaultSeo />
      <AppProviders>
        {getLayout(<Component {...pageProps} />)}
        <CookieConsentBanner />
      </AppProviders>
    </>
  );
}
