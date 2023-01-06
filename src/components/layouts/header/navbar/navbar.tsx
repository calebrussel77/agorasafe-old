import {Popover} from '@headlessui/react';
import Link from 'next/link';
import {FC} from 'react';
import {FaBars} from 'react-icons/fa';

import {LogoIcon} from '@components/icons/logo-icon/logo-icon';
import {ActiveLink} from '@components/lib/active-link/active-link';
import {Button} from '@components/lib/button/button';

type navigationItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navigations: navigationItem[];
};

const Navbar: FC<NavbarProps> = ({navigations}) => {
  return (
    <nav
      className="relative z-10 mx-auto flex max-w-screen-2xl items-end justify-between px-4 sm:px-8 pb-2 pt-4"
      aria-label="Global"
    >
      <div className="flex flex-1 items-center">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link href="#">
            <a>
              <span className="sr-only">agorasafe.</span>
              <LogoIcon className="h-6 lg:h-7 w-auto" />
            </a>
          </Link>
          <div className="-mr-2 flex items-center md:hidden">
            <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
        <div className="hidden space-x-6 md:ml-10 pt-2 md:flex items-center">
          {navigations.map(item => (
            <ActiveLink
              key={item.name}
              href={item.href}
              activeClassName="text-secondary-500 px-1.5 py-1 bg-secondary-100 rounded-md"
            >
              <a className="text-base hover:text-secondary-600 ">{item.name}</a>
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-6">
        <Button size="sm" variant="subtle-link">
          Connexion
        </Button>
        <Button size="sm" variant="secondary">
          Devenir coiffeur
        </Button>
      </div>
    </nav>
  );
};

export {Navbar};
