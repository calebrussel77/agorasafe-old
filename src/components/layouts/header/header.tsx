import { Popover, Transition } from '@headlessui/react';
import Axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import { HiOutlinePhone, HiOutlineSquares2X2 } from 'react-icons/hi2';

import { useModalState } from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

import { useAppearOnTarget } from '@hooks/use-appear-on-target/use-appear-on-target';

import { SubscriptionModal } from '../../subscription-modal/subscription-modal';
import { MobilePopover } from './mobile-popover/mobile-popover';
import { Navbar } from './navbar/navbar';

export const headerNavigations = [
  {
    name: 'Explorer',
    description: 'A complete API reference for our libraries',
    href: '/market',
    icon: HiOutlineSquares2X2,
  },
  {
    name: 'Contact',
    description: 'Read our latest news and articles',
    icon: HiOutlinePhone,

    href: '/contact',
  },
];

const options = {
  rootMargin: '-300px 0px 0px 0px',
};
const classNameList = ['border-b', 'border-gray-300', 'bg-white'];

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dialog = useModalState();
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
    <Popover
      as="header"
      ref={headerRef}
      className={clsx(
        'sticky top-0 inset-x-0 z-20 pb-1 transition-all duration-300 ease-in-out',
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
              className="border border-secondary-300 flex justify-center items-center"
            >
              <p className="text-sm md:text-base font-semibold">
                La plateforme Agorasafe est actuellement en cours de
                developpement. si vous souhaitez être tenu informé de son
                lancement,{' '}
                <SectionMessageAction onClick={dialog.show}>
                  Cliquez ici
                </SectionMessageAction>
              </p>
            </SectionMessage>
            <Navbar navigations={headerNavigations} />
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
                <MobilePopover
                  navigations={headerNavigations}
                  onClose={close}
                />
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

export { Header };
