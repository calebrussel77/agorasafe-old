import { HiLogin, HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

export const DEBOUNCE_QUERIES_MS = 600;

export const MAX_FILES_UPLOAD_SIZE = 2 * 1000 * 1000; // 2mb
export const MAX_IMAGE_UPLOAD_SIZE = 2 * 1000 * 1000; // 2mb

export const EXTENDED_MAX_IMAGE_UPLOAD_SIZE = 5 * 1000 * 1000; // 5mb

export const EXTENSION_FILES_ALLOWED = '.pdf,.PDF,.PPT,.PPTX,.DOC,.DOCX';
export const EXTENSION_IMAGES_ALLOWED =
  'image/png, image/jpeg, image/jpg, image/JPEG, image/JPG, image/PNG';

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
