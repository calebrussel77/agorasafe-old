import {Popover, Transition} from '@headlessui/react';
import {useAppearOnTarget} from '@hooks/use-appear-on-target/use-appear-on-target';
import Axios from 'axios';
import axios from 'axios';
import clsx from 'clsx';
import {Fragment, useEffect, useRef, useState} from 'react';
import {HiOutlinePhone, HiOutlineSquares2X2} from 'react-icons/hi2';

import {Modal, useModalState} from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

import {MobilePopover} from './mobile-popover/mobile-popover';
import {Navbar} from './navbar/navbar';
import {SubscriberLaunchModal} from './subscriber-launch-modal/subscriber-launch-modal';

export const headerNavigations = [
  {
    name: 'Explorer',
    description: 'A complete API reference for our libraries',
    href: '/market',
    icon: HiOutlineSquares2X2,
  },
  // {
  //   name: 'Inpsirations coiffure',
  //   description: 'Installation guides that cover popular setups',
  //   icon: FaTrash,
  //   href: '/inspi',
  // },
  {
    name: 'Contact',
    description: 'Read our latest news and articles',
    icon: HiOutlinePhone,

    href: '/localisation',
  },
];

const options = {
  rootMargin: '-300px 0px 0px 0px',
};
const classNameList = ['border-b', 'border-gray-300', 'bg-white'];

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const dialog = useModalState();
  const targetedSelector = '#home__primary__title'; //Correspond of the first title of the home page

  const {isAppear} = useAppearOnTarget({
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
        'sticky top-0 inset-x-0 z-20 pb-1 transition-all duration-300 ease-in-out'
      )}
    >
      {({close}) => {
        return (
          <>
            <SubscriberLaunchModal dialog={dialog} />
            <SectionMessage
              title="Developpement en cours"
              appareance="discovery"
              className="border-b border-secondary-300"
            >
              <p className="text-sm md:text-base">
                La plateforme AgoraSafe est actuellement en cours de
                developpement. si vous souhaitez être tenu informé de son
                lancement,{' '}
                <SectionMessageAction onClick={dialog.show}>
                  Cliquer ici
                </SectionMessageAction>
              </p>
            </SectionMessage>
            <Navbar navigations={headerNavigations} viewBgHeader={isAppear} />
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

export {Header};
