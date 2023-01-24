import Link from 'next/link';
import React from 'react';

import {ServicesList} from './services-list/services-list';

const services = [
  {
    id: 1,
    title: 'Décorateur intérieur',
    href: '#',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: {name: 'Décoration', href: '#'},
    imageUrl:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    author: {
      name: 'Roel Aufderehar',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '6 min',
    location: 'Douala, cameroun',
    isVerified: true,
  },
  {
    id: 2,
    title: 'Coiffeuse à domicile',
    href: '#',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    category: {name: 'Coiffure & beauté', href: '#'},
    imageUrl: '/images/coiffeur-visage-retourne.jpg',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    author: {
      name: 'Brenna Goyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '4 min',
    location: 'Douala, cameroun',
    isVerified: false,
  },
  {
    id: 3,
    title: 'Cordonnière ambulante',
    href: '#',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: {name: 'Cordonneries', href: '#'},
    imageUrl: '/images/cordonnier-africain.jpg',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '11 min',
    location: 'Ebolowa, cameroun',
    isVerified: true,
  },
  {
    id: 4,
    title: 'Frigoriste de luxe',
    href: '#',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    category: {name: 'Froid & Climation', href: '#'},
    imageUrl: '/images/frigot.jpg',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    author: {
      name: 'Brenna Goyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '4 min',
    location: 'Yaoundé, cameroun',
    isVerified: false,
  },
  {
    id: 5,
    title: 'Coursière à votre disposition',
    href: '#',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: {name: 'Coursier', href: '#'},
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '11 min',
    location: 'Douala, cameroun',
    isVerified: true,
  },
  {
    id: 6,
    title: 'Décoratrice pour mariage',
    href: '#',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: {name: 'Décoration', href: '#'},
    imageUrl:
      'https://images.unsplash.com/photo-1608340097690-31a9135be968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VlZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '11 min',
    location: 'Douala, cameroun',
    isVerified: true,
  },
];

export function PopularProviderServicesSection() {
  return (
    <section
      id="popular-provider-services-section"
      className="relative py-16 mx-auto max-w-screen-xl px-6 lg:px-10"
    >
      <div className="relative">
        <div className="lg:flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-secondary-600">
              En ce moment
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Services les plus récents
            </p>
            <p className="mt-3 max-w-prose text-xl text-gray-500">
              Parcourez actuellement le catalogue de services et produits
              proposés par nos prestataires.
            </p>
          </div>
          <Link
            href="#"
            className="mt-2 flex justify-end hover:underline text-primary-500 font-semibold"
          >
            Voir plus
          </Link>
        </div>
        <div className="mt-4">
          <ServicesList services={services} />
        </div>
      </div>
    </section>
  );
}
