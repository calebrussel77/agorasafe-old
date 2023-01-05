/* eslint-disable @next/next/no-img-element */
import {Popover, Transition} from '@headlessui/react';
import type {NextPage} from 'next';
import {Fragment} from 'react';
import React from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';

import {Button} from '@components/lib/button/button';
import {LogoIcon} from '@components/lib/icons/logo-icon/logo-icon';

import {FeatureSection} from './__components/feature-section/feature-section';
import {HomeBackground} from './__components/home-background/home-background';

const navigation = [
  {name: 'Product', href: '#'},
  {name: 'Features', href: '#'},
  {name: 'Marketplace', href: '#'},
  {name: 'Company', href: '#'},
];

const Home: NextPage = () => {
  return (
    <div className="isolate overflow-x-hidden">
      <HomeBackground />
      <div>
        <div className="relative overflow-hidden">
          <Popover as="header" className="relative">
            <nav
              className="relative mx-auto flex max-w-screen-2xl items-center justify-between px-4 sm:px-8 pb-2 pt-4"
              aria-label="Global"
            >
              <div className="flex flex-1 items-end">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="#">
                    <span className="sr-only">Coiffureauthen.</span>
                    <LogoIcon className="h-8 w-auto" />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <FaBars className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {/* <div className="hidden space-x-8 md:ml-10 md:flex">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium hover:text-gray-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Button>Connexion</Button>
                <Button variant="secondary">Devenir coiffeur/se</Button>
              </div>
            </nav>
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
                className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?from-color=primary&from-shade=500&to-color=secondary&to-shade=600&toShade=600"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600">
                        <span className="sr-only">Close menu</span>
                        <FaTimes className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="pt-5 pb-6">
                    <div className="space-y-1 px-2">
                      {navigation.map(item => (
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
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      <div className="relative pt-4 lg:overflow-hidden lg:pb-14">
        <div className="mx-auto max-w-screen-2xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="text-5xl font-bold tracking-normal sm:mt-5 lg:mt-6">
                  <span className="block">Trouvez votre coiffeur</span>
                  <span className="block bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text pb-3 text-transparent sm:pb-5">
                    Facilement, près de chez vous.
                  </span>
                </h1>
                <p className="text-base text-gray-500">
                  Localisez et prenez rendez-vous auprès de vos coiffeurs où que
                  vous soyez et quand vous le souhaitez. Pour les
                  professionels/amateurs de coiffure nous facilitons votre
                  réferencement sur le web tout en vous donnant la flexibilité
                  de manager vos rendez-vous.
                </p>
                <div className="mt-8">
                  <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                      <div className="min-w-0 flex-1">
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="block w-full rounded-md bg-gray-100 px-4 py-2 border shadow-sm text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Button variant="primary" shape="pill">
                          Envoyer
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Nous ne partagerons en aucun cas vos données
                      confidentielles. Vous pouvez lire notre{' '}
                      <a href="#" className="font-medium text-primary-500">
                        politique de confidentialité ici.
                      </a>
                      .
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="relative py-16">
              <div
                className="absolute inset-x-0 top-0 hidden h-1/2 lg:block"
                aria-hidden="true"
              />
              <div className="lg:grid lg:grid-cols-12">
                <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
                  <div className="h-96 w-80 relative">
                    <img
                      className="rounded-3xl absolute inset-0 h-full w-full object-cover object-center shadow-2xl"
                      src="/images/coiffeur-visage-retourne.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="relative shadow-lg rounded-3xl overflow-hidden lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
                  <img
                    className="absolute inset-0 w-full h-full"
                    src="/images/coiffure-femme.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureSection />
    </div>
  );
};

export default Home;
