import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@helpers/misc';

import { renderFilteredLinks } from '@utils/user-connected-links';

const MobileBottomBar = ({ session }) => {
  const router = useRouter();
  const isPurchaser = session?.user?.is_purchaser;
  const isProvider = session?.user?.is_provider;

  return (
    <nav
      role="naviagtion"
      aria-label="Principal"
      className="bg__blurred fixed z-30 border-t bg-white bg-opacity-60 border-gray-300 bottom-0 inset-x-0 px-2 md:hidden block"
    >
      <ul className="flex items-center justify-between -mx-2">
        {renderFilteredLinks({ isPurchaser, isProvider })
          ?.slice(0, 5)
          ?.map(item => {
            const href =
              item?.id === 5 ? `/u/${session?.user?.slug}` : item?.href;
            const isActiveLink = router?.pathname === href;
            return (
              <li key={item.title}>
                <Link href={href} passHref>
                  <button
                    title={item?.title}
                    className={cn(
                      'flex flex-col text-gray-700 items-center py-3 px-2',
                      isActiveLink &&
                        'text-primary-600 border-t-2 border-primary-500'
                    )}
                  >
                    <item.Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm text-center font-semibold line-clamp-1">
                      {item.mobileTitle}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export { MobileBottomBar };
