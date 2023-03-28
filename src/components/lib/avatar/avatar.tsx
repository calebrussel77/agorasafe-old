/* eslint-disable @next/next/no-img-element */

/* eslint-disable no-undef */
import { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ImageProps } from 'next/dist/client/image';
import Image from 'next/image';
import React, {
  CSSProperties,
  ReactElement,
  forwardRef,
  useState,
} from 'react';

import { blurDataURL } from '@helpers/image';
import { cn } from '@helpers/misc';
import {
  getNameInitials as defaultGetInitials,
  stringToHslColor,
} from '@helpers/misc';

import { AvatarBadge, avatarBadge } from './avatar-badge';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const DEFAULT_FONT_SIZE = 16;
const toRem = px => `${px / DEFAULT_FONT_SIZE}rem`;

const sizes = {
  sm: toRem(20),
  md: toRem(30),
  lg: toRem(40),
  xl: toRem(50),
  xxl: toRem(60),
};

const sizesText = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
  xxl: 'h-24 w-24',
};

const statusText = {
  online: 'ring-2 ring-green-500',
  busy: 'ring-2 ring-gray-300',
  gold: 'ring-2 ring-yellow-500',
};

export interface AvatarOptions {
  children?: JSX.Element;

  //display background color of the avatar by default
  color?: string | CSSProperties['backgroundColor'];

  //Used to display specified component of the avatar
  as?: any;

  //Used to display specified className style
  className?: string;

  //The name of the avatar also use for alt prop
  name: string;

  //The size of the avatar already predefine
  size?: AvatarSize;

  //The avatar url
  src?: string;

  //The fontSize of the error text message
  fontSize?: number;

  //The shape
  shape?: 'rounded' | 'circle' | 'square';

  //used it if the avatar url doesn't need an api base url prefix
  noNeedApiPrefix?: boolean;

  //The position of the avatar display
  position?: 'top' | 'center' | 'bottom';

  //Used it to display a custom initials of the avatar
  getInitials?: (name: string) => string;

  badgePlacement?: VariantProps<typeof avatarBadge>['placement'];
  badgeSize?: VariantProps<typeof avatarBadge>['size'];
  badgeShape?: VariantProps<typeof avatarBadge>['shape'];
  badgeIcon?: JSX.Element | ReactElement;
  status?: 'online' | 'busy' | 'gold';
  isFavorite?: boolean;
  isPremium?: boolean;
}

export type AvatarProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'size' | 'sizes'
> &
  AvatarOptions;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      color,
      fontSize,
      getInitials = defaultGetInitials,
      name,
      as: Component = 'div',
      shape = 'circle',
      size = 'md',
      position = 'top',
      src,
      className,
      status = 'busy',
      isFavorite,
      isPremium,
      badgePlacement,
      badgeSize,
      badgeShape,
      badgeIcon,
      alt,
      style: externalStyle,
      noNeedApiPrefix = true,
      children,
      ...rest
    },
    ref
  ) => {
    const avatarSize = sizes[size];
    const avatarSizeText = sizesText[size];
    const avatarStatusText = statusText[status];
    const avatarFontSize = fontSize || `calc(${avatarSize} / 2.5)`;
    const [error, setError] = useState(false);
    const defaultAvatarSrc = `/images/default-avatar.png`;

    const classes = cn(
      clsx(
        'absolute inset-0 object-cover',
        position === 'top'
          ? 'object-top'
          : position === 'center'
          ? 'object-center'
          : 'object-bottom'
      ),
      className
    );

    return (
      <div className={cn('relative w-fit')}>
        <Component
          aria-label={name}
          style={{
            // background: backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: 'columns',
            flexShrink: '0',
            fontSize: avatarFontSize,
            borderRadius:
              shape === 'circle'
                ? '9999px'
                : shape === 'square'
                ? '0px'
                : '0.375rem',
            ...externalStyle,
          }}
          ref={ref}
          role="img"
          className={cn(
            'flex flex-col items-center justify-center',
            avatarSizeText,
            avatarStatusText,
            className
          )}
          {...rest}
        >
          <Image
            alt={name || alt}
            fill
            src={src || defaultAvatarSrc}
            blurDataURL={blurDataURL()}
            placeholder="blur"
            onError={e => setError(true)}
            className={classes}
          />
        </Component>
        {children && children}
        {status && (
          <AvatarBadge
            {...{
              isFavorite,
              isPremium,
              placement: badgePlacement,
              shape: badgeShape,
              size: badgeSize,
              icon: badgeIcon,
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
