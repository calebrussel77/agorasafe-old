import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { MenuItem } from '@components/lib/menu/menu';

import { renderFilteredLinks } from '@utils/user-connected-links';

const MobileBottomBar = ({ session }) => {
  const router = useRouter();
  const isPurchaser = session?.user?.is_purchaser;
  const isProvider = session?.user?.is_provider;

  return (
    <div className="bg__blurred fixed z-30 border-t border-gray-300 bottom-0 inset-x-0 px-2 lg:hidden block">
      <div className="flex items-center justify-between -mx-2">
        {renderFilteredLinks({ isPurchaser, isProvider })
          ?.slice(0, 5)
          ?.map(item => {
            const href =
              item?.id === 5 ? `/u/${session?.user?.slug}` : item?.href;
            const isActiveLink = router?.pathname === href;
            return (
              <Link key={item.title} href={href} passHref>
                <button
                  title={item?.title}
                  className={twMerge(
                    'flex flex-col items-center py-3 px-2',
                    isActiveLink &&
                      'text-primary-600 border-t border-primary-500'
                  )}
                >
                  <item.Icon className="h-5 w-5" />
                  <span className="text-xs text-center font-semibold line-clamp-1">
                    {item.mobileTitle}
                  </span>
                </button>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const headerHeight = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isPurchaser = session?.user?.is_purchaser;
  const isProvider = session?.user?.is_provider;
  const isSessionLoading = status === 'loading';

  useEffect(() => {
    const headerElement = document?.querySelector('header');
    headerHeight.current = headerElement?.clientHeight || 120;
  });

  return (
    <>
      <div
        style={{
          top: `calc(${headerHeight.current} - 20px)`,
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
      <MobileBottomBar session={session} />
    </>
  );
};

export { Sidebar };
