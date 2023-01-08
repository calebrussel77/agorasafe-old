import {Popover} from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import {FC, ReactElement} from 'react';
import {HiOutlineMenuAlt1, HiOutlineSearch} from 'react-icons/hi';

import {LogoIcon} from '@components/icons/logo-icon/logo-icon';
import {ActiveLink} from '@components/lib/active-link/active-link';
import {Button} from '@components/lib/button/button';
import FadeAnimation from '@components/lib/fade-animation/fade-animation';

import {GlobalSearch} from '@pages/__components/global-search/global-search';

type navigationItem = {
  name: string;
  href: string;
  icon?: any;
};

type NavbarProps = {
  navigations: navigationItem[];
  viewBgHeader?: boolean;
};

const Navbar: FC<NavbarProps> = ({navigations, viewBgHeader}) => {
  return (
    <nav
      className="relative z-10 w-full flex items-center lg:items-end justify-between px-4 sm:px-8 pb-2 pt-4"
      aria-label="Global"
    >
      <div className="flex flex-1 items-center w-full">
        <div className="flex items-center justify-between md:w-auto">
          <div className="mr-2 flex items-center lg:hidden">
            <Popover.Button
              title="menu options"
              className="focus-ring-inset inline-flex items-center justify-center rounded-md p-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <HiOutlineMenuAlt1 className="h-7 w-7" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Link href="#">
            <a>
              <span className="sr-only">Agorasafe</span>
              <LogoIcon className="h-4 md:h-5 w-auto" />
            </a>
          </Link>
        </div>
        <div className="hidden space-x-6 lg:ml-6 lg:flex items-center">
          {navigations.map(item => (
            <ActiveLink
              key={item.name}
              href={item.href}
              activeClassName="text-secondary-500 px-1.5 py-1 bg-secondary-100 rounded-md"
            >
              <a className="whitespace-nowrap hover:text-secondary-600 text-gray-700 font-semibold flex items-center gap-1 ">
                {<item.icon className="h-5 w-5" />}
                <span>{item.name}</span>
              </a>
            </ActiveLink>
          ))}
        </div>
        {viewBgHeader && (
          <FadeAnimation
            visible={viewBgHeader}
            animateEnter
            className={clsx('ml-3 w-full max-w-xl')}
          >
            <GlobalSearch isNavbarSearch={viewBgHeader} />
          </FadeAnimation>
        )}
      </div>
      <div className="hidden md:flex md:items-center md:space-x-4 ml-3">
        <Button
          size="sm"
          variant="subtle-link"
          className="font-semibold bg-transparent"
        >
          Connexion
        </Button>
        <Button size="sm" variant="secondary" className="whitespace-nowrap">
          Proposer un service
        </Button>
      </div>
    </nav>
  );
};

export {Navbar};
