import {Popover, Transition} from '@headlessui/react';
import {Fragment} from 'react';

import {MobilePopover} from './mobile-popover/mobile-popover';
import {Navbar} from './navbar/navbar';

const navigations = [
  {name: 'Coiffeurs', href: '/coiffeurs'},
  {name: 'Market place', href: '/market'},
  {name: 'Inspirations coiffure', href: '/market'},
  {name: 'Localiser', href: '/locate'},
];

const Header = () => {
  return (
    <Popover as="header" className="relative">
      {({close}) => {
        return (
          <>
            <Navbar navigations={navigations} />
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
                className="absolute z-50 inset-0 h-full w-full bg-white top-0 origin-top transform p-2 transition md:hidden"
              >
                <MobilePopover navigations={navigations} onClose={close} />
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

export {Header};
