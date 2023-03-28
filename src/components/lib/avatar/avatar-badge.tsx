/* eslint-disable no-undef */
import { type VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode, forwardRef } from 'react';
import { HiOutlineStar } from 'react-icons/hi';

import { cn } from '@helpers/misc';

export const avatarBadge = cva(['absolute flex-shrink-0'], {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded',
    },
    placement: {
      'top-start':
        'translate top-0 left-2 translate-x-[-25%] translate-y-[-25%]',
      'top-end': 'translate top-0 right-2 translate-x-[25%] translate-y-[-25%]',
      'bottom-start':
        'translate bottom-0 left-2 translate-x-[-25%] translate-y-[25%]',
      'bottom-end':
        'translate bottom-0 right-2 translate-x-[25%] translate-y-[25%]',
    },
    size: {
      xs: ['h-2 w-2'],
      sm: ['h-3 w-3'],
      md: ['h-4 w-4'],
      lg: ['h-5 w-5'],
      xl: ['h-6 w-6'],
    },
  },
  compoundVariants: [
    {
      shape: 'circle',
      placement: 'bottom-end',
      size: 'md',
    },
  ],
  defaultVariants: {
    shape: 'circle',
    placement: 'bottom-end',
    size: 'md',
  },
});

export type AvatarBadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarBadge> &
  // eslint-disable-next-line no-undef
  React.ComponentPropsWithRef<'div'> & {
    icon?: JSX.Element | ReactNode;
    isPremium?: boolean;
    isFavorite?: boolean;
  };

const icons = {
  favorite: HiOutlineStar,
};

const RenderBadge = ({
  ref,
  className,
  placement,
  isFavorite,
  isPremium,
  icon,
  size,
  ...props
}) => {
  const Icon = isFavorite ? HiOutlineStar : isPremium ? HiOutlineStar : null;

  switch (true) {
    case !!icon:
      return React.cloneElement(icon as any, {
        className: cn(
          avatarBadge({
            placement,
            size,
          }),
          className
        ),
      });
    case isFavorite || isPremium:
      return (
        <span
          ref={ref}
          className={cn(
            avatarBadge({
              placement,
              size,
            }),
            className
          )}
        >
          <Icon />
        </span>
      );
    default:
      return null;
  }
};
export const AvatarBadge = forwardRef<HTMLDivElement, AvatarBadgeProps>(
  (
    { className, isPremium, isFavorite, placement, icon, size, ...props },
    ref
  ) => {
    return (
      <RenderBadge
        {...{
          ref,
          className,
          isPremium,
          isFavorite,
          placement,
          icon,
          size,
          ...props,
        }}
      />
    );
  }
);
AvatarBadge.displayName = 'AvatarBadge';
