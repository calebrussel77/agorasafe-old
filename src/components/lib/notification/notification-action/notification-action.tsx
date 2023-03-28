import Link from 'next/link';
import React, { ReactNode, memo } from 'react';

import { cn } from '@helpers/misc';

type NotificationActionProps = {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  isPrimary?: boolean;
};

const ButtonAction = ({ className, isPrimary, onClick, children }) => {
  return (
    <button
      className={cn(
        'font-medium text-sm whitespace-nowrap text-gray-700 hover:text-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none',
        isPrimary &&
          'text-primary-600 hover:text-primary-700 focus:ring-primary-500',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const NotificationAction = memo(function NotificationAction({
  children,
  onClick,
  href,
  className,
  isPrimary = false,
}: NotificationActionProps) {
  return href ? (
    <Link href={href}>
      <ButtonAction
        onClick={onClick}
        isPrimary={isPrimary}
        className={className}
      >
        {children}
      </ButtonAction>
    </Link>
  ) : onClick ? (
    <ButtonAction onClick={onClick} isPrimary={isPrimary} className={className}>
      {children}
    </ButtonAction>
  ) : (
    <>{children}</>
  );
});

NotificationAction.displayName = 'NotificationAction';

export { NotificationAction };
