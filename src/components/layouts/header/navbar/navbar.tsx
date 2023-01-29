import {Popover} from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import {FC, useRef} from 'react';
import {HiOutlineMenuAlt1, HiOutlinePlus} from 'react-icons/hi';

import {GlobalSearchModal} from '@components/global-search-modal/global-search-modal';
import {LogoIcon} from '@components/icons/logo-icon/logo-icon';
import {ActiveLink} from '@components/lib/active-link/active-link';
import {Button} from '@components/lib/button/button';
import {useModalState} from '@components/lib/modal/modal';

type navigationItem = {
  name: string;
  href: string;
  icon?: any;
};

type NavbarProps = {
  navigations: navigationItem[];
};

const rightSideLinks = [
  {
    title: 'Devenir prestataire',
    href: '/become-provider',
  },
  {
    title: 'Connexion',
    href: '/login',
  },
  {
    title: 'Inscription',
    href: '/register',
  },
];

const Navbar: FC<NavbarProps> = ({navigations}) => {
  const dialog = useModalState();
  const initialFocusRef = useRef<any>(null);

  return (
    <nav
      className="relative z-10 w-full flex items-center lg:items-end justify-between px-4 sm:px-8 pb-2 pt-4"
      aria-label="Global"
    >
      <div className="flex items-center">
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
          <Link href="/" passHref>
            <span className="sr-only">Agorasafe</span>
            <LogoIcon className="h-4 md:h-5 w-auto" />
          </Link>
        </div>
        <div className="hidden space-x-6 lg:ml-4 lg:flex items-center">
          {navigations.map(item => (
            <Link
              key={item.name}
              href={item.href}
              passHref
              // activeClassName="text-secondary-500 bg-secondary-100 "
              className="whitespace-nowrap py-1 px-2 rounded-md hover:bg-primary-50 hover:text-primary-600 text-gray-700 font-semibold flex items-center gap-1 transition duration-300"
            >
              {<item.icon className="h-5 w-5" />}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Button
          onClick={dialog.show}
          className="flex items-center text-sm sm:text-base"
        >
          <HiOutlinePlus className="h-6 w-6 hidden sm:inline-block" />
          <span>Demandez un service</span>
        </Button>

        <GlobalSearchModal
          dialog={dialog}
          initialFocusRef={initialFocusRef}
          onCloseDialog={() => {}}
        />
      </div>
      <div className="hidden md:flex md:items-center md:space-x-4 ml-3">
        {rightSideLinks?.map(element => (
          <ActiveLink
            activeClassName="text-primary-500 bg-primary-100 "
            href={element?.href}
            key={element.title}
          >
            <Button
              size="sm"
              variant="subtle-link"
              className="font-semibold bg-transparent hover:bg-primary-50 hover:text-primary-600"
            >
              {element.title}
            </Button>
          </ActiveLink>
        ))}
      </div>
    </nav>
  );
};

export {Navbar};
