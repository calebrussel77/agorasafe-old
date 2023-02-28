import { Popover } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { HiOutlineMenu, HiOutlinePlus } from 'react-icons/hi';
import { Else, If, Then } from 'react-if';
import Skeleton from 'react-loading-skeleton';

import { GlobalSearchModal } from '@components/global-search-modal/global-search-modal';
import { LogoIcon } from '@components/icons/logo-icon/logo-icon';
import { LogoSymbolIcon } from '@components/icons/logo-symbol-icon/logo-symbol-icon';
import { ActiveLink } from '@components/lib/active-link/active-link';
import { Button } from '@components/lib/button/button';
import { useModalState } from '@components/lib/modal/modal';

import {
  headerLeftNavigations,
  headerRightNavigations,
} from '@constants/index';

import { UserConnectedButton } from './user-connected-button/user-connected-button';
import { UserNotificationsButton } from './user-notifications-button/user-notifications-button';

type NavbarProps = {};

const Navbar: FC<NavbarProps> = () => {
  const dialog = useModalState();
  const initialFocusRef = useRef<any>(null);
  const { data: session, status } = useSession();
  const isLoadingSession = status === 'loading';

  return (
    <nav
      className="relative z-10 w-full flex items-center px-4 md:px-8 pb-1.5 pt-3"
      aria-label="navbar-layout"
    >
      <div className="flex items-center max-xs:w-1/3">
        <div className="flex items-center justify-between md:w-auto">
          <Link href="/" passHref>
            {isLoadingSession ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <LogoIcon className="max-xs:hidden flex h-4 md:h-5 w-auto" />
                <LogoSymbolIcon className="max-xs:flex max-xs:h-8 w-auto hidden" />
              </>
            )}
            <span className="sr-only">Agorasafe</span>
          </Link>
        </div>
        <div className="hidden gap-6 md:ml-3 md:flex items-center">
          {isLoadingSession
            ? headerLeftNavigations.map(item => (
                <Skeleton key={item?.name} className="h-8 w-12" />
              ))
            : headerLeftNavigations.map(item => (
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
      <div className="flex justify-center mx-1 w-full flex-1">
        <Button
          onClick={dialog.show}
          skeleton={isLoadingSession}
          className="flex items-center text-sm lg:text-base whitespace-nowrap"
        >
          <HiOutlinePlus className="h-6 w-6 hidden lg:inline-block" />
          <span>Demandez un service</span>
        </Button>
        <GlobalSearchModal
          dialog={dialog}
          initialFocusRef={initialFocusRef}
          onCloseDialog={() => {}}
        />
      </div>
      <div className="flex justify-end items-center gap-4 max-xs:w-1/3">
        {isLoadingSession ? (
          headerRightNavigations.map(element => (
            <Skeleton key={element?.title} className="h-8 w-12" />
          ))
        ) : (
          <If condition={!!session}>
            <Then>
              <UserNotificationsButton />
              <UserConnectedButton session={session} />
            </Then>
            <Else>
              <div className="flex items-center md:hidden">
                <Popover.Button
                  title="menu options"
                  className="focus-ring-inset inline-flex items-center justify-center rounded-md p-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {isLoadingSession ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <HiOutlineMenu className="h-8 w-8" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden md:flex">
                {headerRightNavigations?.map(element => (
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
                      <span className="whitespace-nowrap">{element.title}</span>
                    </Button>
                  </ActiveLink>
                ))}
              </div>
            </Else>
          </If>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
