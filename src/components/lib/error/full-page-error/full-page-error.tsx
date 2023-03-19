import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

import { LogoIcon } from '@components/icons/logo-icon/logo-icon';

import { Accordion } from '../../accordion/accordion';
import { ImageUI } from '../../image-ui/image-ui';

export default function FullPageError({ error }) {
  return (
    <>
      <div className="grid min-h-full sm:grid-cols-2 bg-white h-screen">
        <div className="flex flex-col">
          <main className="flex flex-grow flex-col bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <Link href="/" className="inline-flex" passHref>
                  <span className="sr-only">Agorasafe</span>
                  <LogoIcon className="h-6 w-auto" />
                </Link>
              </div>
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-primary-600">501</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Erreur survenue
                </h1>
                <p className="mt-2 text-base text-gray-500 max-w-lg w-full">
                  Nous sommes désolé, une erreur est survenue lors de votre
                  précédente action, nous travaillons dessus pour un retour à la
                  normale le plus vite possible.
                </p>
                <Accordion
                  className="max-w-md w-full"
                  buttonClassName="p-2 bg-gray-100 rounded-md mt-3"
                  title={<span className="italic">Developer stack</span>}
                >
                  <div className="p-3 rounded-md w-full max-w-xl overflow-y-auto max-h-80 text-gray-600 bg-gray-100 mt-1">
                    {error?.message}
                  </div>
                </Accordion>

                <div className="mt-6">
                  <Link
                    passHref
                    href="#"
                    className="text-base font-medium text-primary-600 hover:text-primary-500"
                  >
                    Retour en arrière
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0 bg-gray-50">
            <div className="mx-auto w-full max-w-7xl py-16 px-6 lg:px-8">
              <nav className="flex space-x-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Contact Support
                </Link>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Status
                </Link>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Twitter
                </Link>
              </nav>
            </div>
          </footer>
        </div>
        <div className="hidden sm:block">
          <ImageUI
            className="h-full w-full"
            noNeedApiPrefix
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            name="user not found"
          />
        </div>
      </div>
    </>
  );
}
