import {Popover, Transition} from '@headlessui/react';
import Axios from 'axios';
import clsx from 'clsx';
import {Fragment, useEffect, useRef, useState} from 'react';
import {
  HiCheckCircle,
  HiOutlinePhone,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';
import {useMutation} from 'react-query';

import {Button} from '@components/lib/button/button';
import {Input} from '@components/lib/input/input';
import {Modal, useModalState} from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

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

const FormSubscription = ({onSubmit, formRef}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit({email_subscription: email, name_subscription: name});
      }}
      ref={formRef}
      className="space-y-2"
    >
      <div>
        <label htmlFor="email_subscription">Adresse email</label>
        <Input
          id="email_subscription"
          type="email"
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name_subscription">Votre nom</label>
        <Input
          id="name_subscription"
          required
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </div>
    </form>
  );
};

const SubscriberLaunchModal = ({dialog}) => {
  const {mutate, isLoading, isSuccess} = useMutation(formData => {
    return fetch('https://app.convertkit.com/forms/3997673/subscriptions', {
      method: 'POST',
      body: formData as any,
      headers: {'content-type': 'multipart/form-data'},
    });
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = ({email_subscription, name_subscription}) => {
    let formData = new FormData();
    formData.append('email_address', email_subscription);
    formData.append('fields[first_name]', name_subscription);
    formData.append('user', 'd506b01f-b95b-4c4e-945e-f35dfa9f6a9d');
    mutate(formData as any);
  };

  return (
    <Modal state={dialog} className="md:w-[630px] 2xl:w-[650px]">
      <Modal.Header title={`Enregistrement du lancement`} />
      {isSuccess ? (
        <Modal.Body>
          <div className="my-6 p-2 bg-green-50 text-green-500 flex gap-2 items-center">
            <HiCheckCircle className="h-5 w-5" />
            <span> Merci d'avoir souscris à l'enregistrement !</span>
          </div>
        </Modal.Body>
      ) : (
        <>
          <Modal.Body>
            <FormSubscription onSubmit={onSubmit} formRef={formRef} />
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end w-full">
              <Button
                onClick={() => formRef?.current?.requestSubmit()}
                isLoding={isLoading}
              >
                Envoyer
              </Button>
            </div>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

const Header = () => {
  const [viewBgHeader, setViewBgHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const dialog = useModalState();

  useEffect(() => {
    const sectionOne = document.querySelector('#home__primary__title');
    const classNameList = ['border-b', 'border-gray-300'];
    const sectionOneObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          setViewBgHeader(true);
          headerRef?.current?.classList?.add(...classNameList);
          headerRef?.current?.classList?.add('bg-opacity-100');
          headerRef?.current?.classList?.add('bg-white');
          headerRef?.current?.classList?.remove('bg-opacity-0');
        } else {
          setViewBgHeader(false);
          headerRef?.current?.classList?.remove(...classNameList);
          headerRef?.current?.classList?.remove('bg-opacity-100');
          headerRef?.current?.classList?.add('bg-opacity-0');
          headerRef?.current?.classList?.remove('bg-white');
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
        'sticky top-0 inset-x-0 z-20 pb-1 transition-all duration-300 ease-in-out'
      )}
    >
      {({close}) => {
        return (
          <>
            <SubscriberLaunchModal dialog={dialog} />
            <SectionMessage
              title="Developpement en cours"
              appareance="info"
              className="border-b border-primary-300"
            >
              <p>
                La plateforme AgoraSafe est actuellement en cours de
                developpement. si vous souhaitez être tenu informé de son
                lancement,{' '}
                <SectionMessageAction onClick={dialog.show}>
                  Cliquer ici
                </SectionMessageAction>
              </p>
            </SectionMessage>
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
