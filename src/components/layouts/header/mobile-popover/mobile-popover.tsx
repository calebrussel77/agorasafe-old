import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { forwardRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import { LogoIcon } from '@components/icons/logo-icon/logo-icon';
import { Button } from '@components/lib/button/button';

import {
  headerLeftNavigations,
  headerRightNavigations,
} from '@constants/index';

type MobilePopoverProps = {
  onClose: () => void;
};

const MobilePopover = forwardRef<HTMLDivElement, MobilePopoverProps>(
  ({ onClose }, ref) => {
    return (
      <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
        <div className="flex items-center justify-between px-5 pt-4">
          <LogoIcon className="h-5 w-auto" />
          <Button
            onClick={onClose}
            variant="subtle"
            className="shadow-none ml-2"
          >
            <span className="sr-only">Close menu</span>
            <HiOutlineX className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <div className="pt-5 pb-6">
          <div className="space-y-1 px-2">
            {headerLeftNavigations.map(item => (
              <Link
                passHref
                key={item.name}
                href={item.href}
                className="rounded-md flex items-center gap-2 px-3 py-2 text-base text-gray-700 font-semibold hover:bg-gray-50"
              >
                {<item.icon className="h-5 w-5" />}
                <span>{item.name}</span>
              </Link>
            ))}
            {headerRightNavigations.slice(0, 1).map(item => (
              <Link
                passHref
                key={item.title}
                href={item.href}
                className="rounded-md flex items-center gap-2 px-3 py-2 text-base text-gray-700 font-semibold hover:bg-gray-50"
              >
                {<item.icon className="h-5 w-5" />}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 px-5 w-full">
            <Link passHref href="/register">
              <Button variant="secondary" className="whitespace-nowrap w-full">
                Inscription
              </Button>
            </Link>
          </div>
          <div className="mt-6 px-5">
            <p className="text-center text-base font-medium text-gray-500">
              Utilisateur existant ?{' '}
              <Link href="/login" className="text-gray-900 hover:underline">
                Connexion
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

MobilePopover.displayName = 'MobilePopover';
export { MobilePopover };
