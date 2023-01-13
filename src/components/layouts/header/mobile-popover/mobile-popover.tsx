import {FC, forwardRef} from 'react';
import {HiOutlineX} from 'react-icons/hi';

import {LogoIcon} from '@components/icons/logo-icon/logo-icon';
import {Button} from '@components/lib/button/button';

type navigationItem = {
  name: string;
  href: string;
  icon: any;
};

type MobilePopoverProps = {
  navigations: navigationItem[];
  onClose: () => void;
};

const MobilePopover = forwardRef<HTMLDivElement, MobilePopoverProps>(
  ({navigations, onClose}, ref) => {
    return (
      <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
        <div className="flex items-center justify-between px-5 pt-4">
          <div>
            <LogoIcon className="h-6 w-auto" />
          </div>
          <div className="-mr-2">
            <Button onClick={onClose} variant="subtle" className="shadow-none">
              <span className="sr-only">Close menu</span>
              <HiOutlineX className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="pt-5 pb-6">
          <div className="space-y-1 px-2">
            {navigations.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-md flex items-center gap-2 px-3 py-2 text-base text-gray-700 font-semibold hover:bg-gray-50"
              >
                {<item.icon className="h-5 w-5" />}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 px-5 w-full">
            <Button variant="secondary" className="whitespace-nowrap w-full">
              Proposer un service
            </Button>
          </div>
          <div className="mt-6 px-5">
            <p className="text-center text-base font-medium text-gray-500">
              Client existant ?{' '}
              <a href="#" className="text-gray-900 hover:underline">
                Connexion
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

MobilePopover.displayName = 'MobilePopover';
export {MobilePopover};
