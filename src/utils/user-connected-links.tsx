import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineChatAlt, HiOutlineCog } from 'react-icons/hi';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { TbBookmarks } from 'react-icons/tb';

export const userConnectedLinks = [
  {
    id: 1,
    Icon: RxDashboard,
    title: 'Tableau de bord',
    mobileTitle: 'Dashboard',
    description: 'Accéder à mon tableau de bord personnel',
    href: '/dashboard',
  },
  {
    id: 2,
    Icon: TbBookmarks,
    title: 'Mes demandes',
    mobileTitle: 'Demandes',
    description: 'Consulter mes demandes de service',
    href: '/dashboard/my-requests',
  },
  {
    id: 3,
    Icon: HiOutlineChatAlt,
    title: 'Conversations',
    mobileTitle: 'Conversations',
    description: 'Consulter mes messages inbox',
    href: '/dashboard/inbox',
  },
  {
    id: 4,
    Icon: MdOutlineWorkOutline,
    title: 'Services postulés',
    mobileTitle: 'Services',
    description: "Accéder aux services auxquels j'ai postulé",
    href: '/dashboard/applied-services',
  },
  {
    id: 6,
    Icon: HiOutlineCog,
    title: 'Paramètres',
    mobileTitle: 'Paramètres',
    description: 'Gérer mes paramètres utilisateur',
    href: '/dashboard/settings',
  },
  {
    id: 5,
    Icon: AiOutlineUser,
    title: 'Mon profil',
    mobileTitle: 'Profil',
    description: 'Accéder à mon profil publique',
    href: '#',
  },
];

// Filter the items based on the user's properties
export const renderFilteredLinks = ({ isPurchaser, isProvider }) => {
  switch (true) {
    case isPurchaser && !isProvider:
      return userConnectedLinks.filter(link => link?.id !== 3);
    case !isPurchaser && isProvider:
      return userConnectedLinks.filter(link => link.id !== 2);
    case isPurchaser && isProvider:
      return userConnectedLinks;
    default:
      return userConnectedLinks;
  }
};
