import {FC, forwardRef} from 'react';
import {FaTimes} from 'react-icons/fa';

import {LogoIcon} from '@components/icons/logo-icon/logo-icon';
import {Button} from '@components/lib/button/button';

type navigationItem = {
  name: string;
  href: string;
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
            <Button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600"
            >
              <span className="sr-only">Close menu</span>
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="pt-5 pb-6">
          <div className="space-y-1 px-2">
            {navigations.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-6 px-5">
            <a
              href="#"
              className="block w-full rounded-md bg-gradient-to-r from-primary-500 to-secondary-600 py-3 px-4 text-center font-medium shadow hover:from-primary-600 hover:to-secondary-700"
            >
              Start free trial
            </a>
          </div>
          <div className="mt-6 px-5">
            <p className="text-center text-base font-medium text-gray-500">
              Existing customer?{' '}
              <a href="#" className="text-gray-900 hover:underline">
                Login
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
