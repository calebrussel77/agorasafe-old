import CookieConsent from 'react-cookie-consent';

import { ImageUI } from '@components/lib/image-ui/image-ui';

import { cn } from '@helpers/misc';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      buttonText="Oui je comprend"
      cookieName="AgoraSafeCookieConsent"
      buttonClasses={cn(
        '!px-3 !py-2 !ml-1 !text-sm !m-0 !bg-primary-600 !rounded-full !shadow-primary-600/20 !shadow-md !text-white !border-transparent !hover:bg-primary-700 !focus:outline-none !focus:ring-2 !focus:ring-primary-500'
      )}
      containerClasses={cn(
        '!bg-white !p-2 !shadow-lg !w-auto !max-w-xl md:!rounded-full !items-center md:!bottom-5 !border !text-gray-800'
      )}
      onAccept={() => {
        /* your logic here */
      }}
      contentClasses={cn('!m-0 !flex-1 !flex !items-center')}
    >
      <ImageUI
        name="cookies"
        noNeedApiPrefix
        src="/images/cookies.png"
        className="h-10 w-10"
      />
      <span className="ml-2">
        Nous utitlisons les cookies pour améliorer votre expérience utilisateur.
      </span>
    </CookieConsent>
  );
};

export { CookieConsentBanner };
