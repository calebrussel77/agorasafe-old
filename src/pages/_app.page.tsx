/* eslint-disable @typescript-eslint/ban-types */
import ProgressBar from '@badrap/bar-of-progress';
import {AppProviders} from '@providers/app-providers';
import '@styles/globals.css';
import type {NextPage} from 'next';
import {DefaultSeo} from 'next-seo';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {Router} from 'next/router';
import type {ReactElement, ReactNode} from 'react';

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
      <DefaultSeo
        defaultTitle="AgoraSafe - Trouvez les meilleurs services adaptés pour n'importe quel travail."
        titleTemplate="%s | AgoraSafe - Trouvez les meilleurs services adaptés pour n'importe quel travail."
        languageAlternates={[
          {href: 'https://www.agorasafe.com/', hrefLang: 'en'},
          {href: 'https://www.agorasafe.com/fr', hrefLang: 'fr'},
        ]}
        description="Recherchez facilement des prestataires près de chez vous, qui
        seront ravis d'éffectuer vos travaux à des coûts très
        accessible."
        openGraph={{
          type: 'website',
          locale: 'fr_FR',
          url: 'https://www.agorasafe.com/',
          images: [
            {
              url: 'https://res.cloudinary.com/lerussecaleb/image/upload/v1673026579/preview-agorasafe_mfysvz.png',
              width: 500,
              height: 500,
              alt: 'agorasafe preview',
              type: 'image/png',
            },
          ],
          site_name: 'agorasafe',
        }}
      />
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="agorasafe" />
        <meta name="apple-mobile-web-app-title" content="agorasafe" />
        <meta name="theme-color" content="#ffff" />
        <meta name="msapplication-navbutton-color" content="#ffff" />
        <meta name="author" content="Caleb russel" />
        <meta
          name="keywords"
          content="agorasafe, photos, images, tableau en bois, bâches, perciglace, vente, shop "
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-starturl" content="/" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
      </Head>
      <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>
    </>
  );
}
