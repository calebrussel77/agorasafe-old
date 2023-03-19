import { AppProviders } from '@app-providers/app-providers';
import ProgressBar from '@badrap/bar-of-progress';
import type { NextPage } from 'next';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Router } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MdWifi, MdWifiOff } from 'react-icons/md';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { CookieConsentBanner } from '@components/cookie-consent-banner/cookie-consent-banner';
import { DefaultSeo } from '@components/default-seo/default-seo';
import { Notification } from '@components/lib/notification';

import { useNotificationNetwork } from '@hooks/use-notification-network/use-notification-network';

import '../styles/globals.css';
import { api } from '../utils/api';

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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useNotificationNetwork({
    activeNetworkNotification: (
      <Notification
        icon={<MdWifi className="h-5 w-5" />}
        variant="success"
        title="Votre connexion internet a été rétablie."
      />
    ),
    failedNetworkNotification: (
      <Notification
        icon={<MdWifiOff className="h-5 w-5" />}
        variant="warning"
        title="Vous êtes actuellement hors ligne."
      />
    ),
  });

  // Use the layout defined at the page level, if available
  const getLayout =
    (Component as NextPageWithLayout).getLayout ?? (page => page);

  return (
    <AppProviders>
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        closeButton={false}
        className="bg-transparent sm:max-w-sm px-3 w-full"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SessionProvider session={session}>
        <DefaultSeo />
        {getLayout(<Component {...pageProps} />)}
        <CookieConsentBanner />
      </SessionProvider>
    </AppProviders>
  );
};

export default api.withTRPC(MyApp);
