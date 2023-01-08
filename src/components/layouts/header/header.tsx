import {Popover, Transition} from '@headlessui/react';
import clsx from 'clsx';
import {Fragment, useEffect, useRef, useState} from 'react';
import {HiOutlinePhone, HiOutlineSquares2X2} from 'react-icons/hi2';

import {MobilePopover} from './mobile-popover/mobile-popover';
import {Navbar} from './navbar/navbar';

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

const sectionOneOptions = {
  rootMargin: '-300px 0px 0px 0px',
};

const Header = () => {
  const [viewBgHeader, setViewBgHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionOne = document.querySelector('#home__primary__title');
    const classNameList = ['border-b', 'border-gray-300'];
    const sectionOneObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          setViewBgHeader(true);
          headerRef?.current?.classList?.add(...classNameList);
          headerRef?.current?.classList?.add('bg-opacity-100');
          headerRef?.current?.classList?.remove('bg-opacity-0');
        } else {
          setViewBgHeader(false);
          headerRef?.current?.classList?.remove(...classNameList);
          headerRef?.current?.classList?.remove('bg-opacity-100');
          headerRef?.current?.classList?.add('bg-opacity-0');
        }
      });
    }, sectionOneOptions);
    sectionOneObserver?.observe(sectionOne);
  });

  return (
    <Popover
      as="header"
      ref={headerRef}
      className={clsx(
        'sticky top-0 inset-x-0 z-20 bg-white pb-1 transition-all duration-300 ease-in-out'
      )}
    >
      {({close}) => {
        return (
          <>
            <Navbar
              navigations={headerNavigations}
              viewBgHeader={viewBgHeader}
            />
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
