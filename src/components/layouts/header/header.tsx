import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';

import { useModalState } from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

import { MobileBottomBar } from '@pages/__components/mobile-bottom-bar/mobile-bottom-bar';

import { cn } from '@helpers/misc';

import { useAppearOnTarget } from '@hooks/use-appear-on-target/use-appear-on-target';

import { SubscriptionModal } from '../../subscription-modal/subscription-modal';
import { MobilePopover } from './mobile-popover/mobile-popover';
import { Navbar } from './navbar/navbar';

const options = {
  rootMargin: '-300px 0px 0px 0px',
};
const classNameList = [
  'border-b',
  'border-gray-300',
  'bg-white',
  'bg-opacity-60',
];

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dialog = useModalState();
  const { data: session, status } = useSession();
  const isLoadingSession = status === 'loading';

  // Correspond of the first title of the home page
  const targetedSelector = '#home__primary__title';
  const isHomePage = router?.pathname === '/';

  useAppearOnTarget({
    elementRef: headerRef,
    targetedSelector,
    classNameList,
    options,
  });

  return (
    <>
      <Popover
        as="header"
        ref={headerRef}
        className={cn(
          'sticky top-0 bg__blurred inset-x-0 z-20 pb-1 transition-all duration-300 ease-in-out',
          !isHomePage && classNameList
        )}
      >
        {({ close }) => {
          return (
            <>
              <SubscriptionModal dialog={dialog} />
              <SectionMessage
                appareance="discovery"
                hasCloseButton={false}
                className="flex justify-center items-center"
              >
                <p className="text-sm">
                  La plateforme Agorasafe est actuellement en cours de
                  developpement. si vous souhaitez être tenu informé dès son
                  lancement,{' '}
                  <SectionMessageAction onClick={dialog.show} isPrimary>
                    Cliquez ici
                  </SectionMessageAction>
                </p>
              </SectionMessage>
              <Navbar isLoadingSession={isLoadingSession} session={session} />
              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-50 inset-0 h-full w-full bg-white top-0 origin-top transform p-2 transition lg:hidden"
                >
                  <MobilePopover onClose={close} />
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
      {session && <MobileBottomBar session={session} />}
    </>
  );
};

export { Header };
