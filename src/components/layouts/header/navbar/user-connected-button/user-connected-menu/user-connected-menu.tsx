import {signOut, useSession} from 'next-auth/react';
import {FC} from 'react';
import {AiOutlineLogout, AiOutlineUser} from 'react-icons/ai';
import {HiOutlineCog} from 'react-icons/hi';
import {RxDashboard} from 'react-icons/rx';
import {TbBookmarks} from 'react-icons/tb';

import {Avatar} from '@components/lib/avatar/avatar';
import {MenuItem} from '@components/lib/menu/menu';
import {Popover} from '@components/lib/popover/popover';

type UserConnectedMenuProps = {
  popover: any;
  hide: () => void;
};

export const userConnectedLinks = [
  {
    Icon: RxDashboard,
    title: 'Tableau de bord',
    description: 'Accéder à mon tableau de bord personnel',
    href: '/dashboard',
  },
  {
    Icon: TbBookmarks,
    title: 'Mes demandes',
    description: 'Consulter mes demandes de service',
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: 'Services postulés',
    description: "Accéder aux services auxquels j'ai postulé",
    href: '/#',
  },
  {
    Icon: AiOutlineUser,
    title: 'Mon profil',
    description: 'Accéder à mon profil publique',
    href: '/#',
  },
  {
    Icon: HiOutlineCog,
    title: 'Paramètres',
    description: 'Gérer mes paramètres utilisateur',
    href: '/#',
  },
];

const UserConnectedMenu: FC<UserConnectedMenuProps> = ({popover, hide}) => {
  const {data: session} = useSession();

  return (
    <Popover
      {...{...popover, state: popover.state}}
      aria-label={`Click to open ${session?.user?.name} menu options`}
    >
      <Popover.Content>
        <div>
          <MenuItem
            iconBefore={
              <div className="rounded-full w-fit h-fit bg-gradient-to-b from-primary-500 to-secondary-700 p-0.5">
                <Avatar
                  src={session?.user?.avatar}
                  name={session?.user?.name}
                  size="xxl"
                />
              </div>
            }
            hovered={false}
            description={session?.user?.email}
          >
            <h3 className="font-semibold"> {session?.user?.name}</h3>
          </MenuItem>
          <hr className="my-3 border-gray-200" />
          <section className="space-y-1">
            {userConnectedLinks.map(item => {
              return (
                <MenuItem
                  key={item.title}
                  href={item?.href}
                  onClick={hide}
                  iconBefore={<item.Icon className="h-6 w-6" />}
                  description={item.description}
                >
                  {item.title}
                </MenuItem>
              );
            })}
            <MenuItem
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
                hide();
              }}
              iconBefore={<AiOutlineLogout className="h-6 w-6" />}
              description="Se déconnecter de ma session"
            >
              Déconnexion
            </MenuItem>
          </section>
        </div>
      </Popover.Content>
    </Popover>
  );
};

export {UserConnectedMenu};
