import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { MenuItem } from '@components/lib/menu/menu';

import { renderFilteredLinks } from '@utils/user-connected-links';

import { useHeaderHeight } from '@hooks/use-header-height/use-header-height';

const Sidebar = () => {
  const { height } = useHeaderHeight();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPurchaser = session?.user?.is_purchaser;
  const isProvider = session?.user?.is_provider;
  const isSessionLoading = status === 'loading';

  return (
    <>
      <div
        style={{
          top: `calc(${height} - 20px)`,
          position: 'fixed',
        }}
        className="w-[360px] hidden lg:block px-4 sm:px-8 bg-white h-full border-r border-gray-300 overflow-hidden"
      >
        <div className="mt-6 flex flex-col gap-3">
          {renderFilteredLinks({ isPurchaser, isProvider })?.map(item => {
            const href =
              item?.id === 5 ? `/u/${session?.user?.slug}` : item?.href;
            const isActiveLink = router?.pathname === href;
            return (
              <MenuItem
                key={item.title}
                loading={isSessionLoading}
                isActive={isActiveLink}
                href={href}
                iconBefore={<item.Icon className="h-6 w-6 text-primary-500" />}
                description={item.description}
              >
                <p className="text-lg font-semibold">{item.title}</p>
              </MenuItem>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Sidebar };
