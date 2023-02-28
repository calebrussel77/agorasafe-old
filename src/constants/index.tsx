import { HiLogin, HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

export const headerLeftNavigations = [
  {
    name: 'Explorer',
    description: 'A complete API reference for our libraries',
    href: '/market',
    icon: HiOutlineSquares2X2,
  },
  // {
  //   name: 'Contact',
  //   description: 'Read our latest news and articles',
  //   icon: HiOutlinePhone,

  //   href: '/contact',
  // },
];

export const headerRightNavigations = [
  {
    title: 'Proposer mes services',
    href: '/become-provider',
    icon: HiOutlineUserGroup,
  },
  {
    title: 'Connexion',
    href: '/login',
    icon: HiLogin,
  },
  // {
  //   title: 'Inscription',
  //   href: '/register',
  // },
];
