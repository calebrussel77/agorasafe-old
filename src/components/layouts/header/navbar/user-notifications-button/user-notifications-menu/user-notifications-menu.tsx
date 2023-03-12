import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineCog } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { TbBookmarks } from 'react-icons/tb';

import { Avatar } from '@components/lib/avatar/avatar';
import { MenuItem } from '@components/lib/menu/menu';
import { Popover } from '@components/lib/popover/popover';

type UserNotificationsMenuProps = {
  popover: any;
  hide: () => void;
};

const userConnectedLinks = [
  {
    Icon: RxDashboard,
    title: `Il y'a 02 jours`,
    description: `Votre job "Faire des tresses à domicile" expire bientôt`,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 02 semaines`,
    description: `Votre job "Faire des tresses à domicile" a bien été crée`,
    href: '/#',
  },

  {
    Icon: TbBookmarks,
    title: `Il y'a 06 semaines`,
    description: `Une personne a consulté votre profile. cliquez pour en savoir plus`,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 02 Mois`,
    description: `Jean Marie vous a attribué une note de "5/5" pour le job effectué "Coursier à domicile" `,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 06 Semaines`,
    description: `Jean Marie vous a attribué une note de "5/5" pour le job effectué "Coursier à domicile" `,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 10 Mois`,
    description: `Jean Marie vous a attribué une note de "5/5" pour le job effectué "Coursier à domicile" `,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 12 Mois`,
    description: `Jean Marie vous a attribué une note de "5/5" pour le job effectué "Coursier à domicile" `,
    href: '/#',
  },
  {
    Icon: TbBookmarks,
    title: `Il y'a 05 Mois`,
    description: `Jean Marie vous a attribué une note de "5/5" pour le job effectué "Coursier à domicile" `,
    href: '/#',
  },
];

const UserNotificationsMenu: FC<UserNotificationsMenuProps> = ({
  popover,
  hide,
}) => {
  const { data: session } = useSession();

  return (
    <Popover
      {...{ ...popover, state: popover.state }}
      aria-label={`Click to open ${session?.user?.name} menu options`}
      className="max-w-[310px] sm:max-w-[390px]"
      preventBodyScroll
    >
      <Popover.Content>
        <div>
          <MenuItem hovered={false} description="Accédez à mes notifications">
            <h3 className="font-semibold">Notifications</h3>
          </MenuItem>
          <hr className="mb-3 border-gray-200" />
          <section className="space-y-1">
            {userConnectedLinks?.map(item => (
              <MenuItem
                key={item.title}
                onClick={hide}
                href={item?.href}
                description={item.title}
              >
                <p className="font-semibold">{item.description}</p>
              </MenuItem>
            ))}
          </section>
        </div>
      </Popover.Content>
    </Popover>
  );
};

export { UserNotificationsMenu };
