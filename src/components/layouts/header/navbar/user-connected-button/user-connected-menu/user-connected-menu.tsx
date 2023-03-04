import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

import { Avatar } from '@components/lib/avatar/avatar';
import { MenuItem } from '@components/lib/menu/menu';
import { Popover } from '@components/lib/popover/popover';

import { renderFilteredLinks } from '@utils/user-connected-links';

type UserConnectedMenuProps = {
  popover: any;
  hide: () => void;
};

const UserConnectedMenu: FC<UserConnectedMenuProps> = ({ popover, hide }) => {
  const { data: session, status } = useSession();
  const isPurchaser = session?.user?.is_purchaser;
  const isProvider = session?.user?.is_provider;
  const isSessionLoading = status === 'loading';
  const router = useRouter();

  return (
    <Popover
      {...{ ...popover, state: popover.state }}
      aria-label={`Click to open ${session?.user?.name} menu options`}
      className="max-w-[310px] sm:max-w-[390px]"
      preventBodyScroll
    >
      <Popover.Content>
        <div>
          <MenuItem
            className="px-1"
            iconBefore={
              <Avatar
                src={session?.user?.avatar}
                name={session?.user?.name}
                size="xxl"
              />
            }
            hovered={false}
            description={session?.user?.email}
          >
            <h3 className="font-semibold"> {session?.user?.name}</h3>
          </MenuItem>
          <hr className="my-3 border-gray-200" />
          <section className="flex flex-col space-y-0.5">
            {renderFilteredLinks({ isPurchaser, isProvider })
              .filter(el => el.id !== 3)
              ?.map(item => {
                const href =
                  item?.id === 5 ? `/u/${session?.user?.slug}` : item?.href;
                const isActiveLink = router?.pathname === href;

                return (
                  <MenuItem
                    key={item.title}
                    isActive={isActiveLink}
                    loading={isSessionLoading}
                    href={href}
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

export { UserConnectedMenu };
