import {VariantProps} from 'class-variance-authority';
import clsx from 'clsx';
import Image from 'next/image';
import React, {CSSProperties, ReactElement, forwardRef, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import {blurDataURL} from '@utils/image';
import {
  getNameInitials as defaultGetInitials,
  stringToHslColor,
} from '@utils/misc';

import {Presence, presenceDiv} from './presence';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const DEFAULT_FONT_SIZE = 16;
const toRem = (px: number) => `${px / DEFAULT_FONT_SIZE}rem`;

export interface AvatarOptions {
  //display the presence of the avatar by default
  presenceIcon?: ReactElement;

  //display background color of the avatar by default
  color?: string | CSSProperties['backgroundColor'];

  //display presencePositionClassName of the avatar by default
  presencePositionClassName?: string;

  //Used to display specified component of the avatar
  as?: any;

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
}

export type AvatarProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'size' | 'sizes'
> &
  AvatarOptions &
  VariantProps<typeof presenceDiv>;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      color,
      fontSize,
      getInitials = defaultGetInitials,
      name,
      presence,
      presenceIcon,
      presenceSize = 'sm',
      presencePositionClassName,
      as: Component = 'div',
      shape = 'circle',
      size = 'md',
      position = 'top',
      src,
      className,
      style: externalStyle,
      noNeedApiPrefix = false,
      children,
      ...rest
    },
    ref
  ) => {
    const backgroundColor = color || stringToHslColor(name);
    const sizes = {
      sm: toRem(20),
      md: toRem(30),
      lg: toRem(40),
      xl: toRem(50),
      xxl: toRem(60),
    };
    const sizesText = {
      sm: 'h-5 w-5',
      md: 'h-7 w-7',
      lg: 'h-8 w-8',
      xl: 'h-10 w-10',
      xxl: 'h-12 w-12',
    };
    const presencePosition = {
      xs: '-bottom-0.5 -right-0.5',
      sm: 'bottom-0 right-0.5',
      md: '-bottom-0.5 -right-0.5',
      lg: '-bottom-0.5 -right-0.5',
      xl: '-bottom-0.5 -right-0.5',
    };
    const avatarSize = sizes[size];
    const avatarSizeText = sizesText[size];
    const avatarFontSize = fontSize || `calc(${avatarSize} / 2.5)`;
    const [error, setError] = useState(false);
    const avatarSrc = noNeedApiPrefix
      ? src
      : `${process.env.NEXT_PUBLIC_BASE_UPLOAD_URL as string}/${src}`;

    const displayPresence = presenceIcon ? (
      presenceIcon
    ) : presence ? (
      <Presence presence={presence} presenceSize={presenceSize} />
    ) : null;

    const classes = twMerge(
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
      <div className="relative">
        <Component
          aria-label={name}
          style={{
            background: backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: '0',
            fontSize: avatarFontSize,
            fontWeight: 'bold',
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
          className={twMerge(clsx(`flex ${avatarSizeText}`), className)}
          {...rest}
        >
          {src && !error && (
            <Image
              alt={name}
              src={avatarSrc as string}
              blurDataURL={blurDataURL()}
              layout="fill"
              placeholder="blur"
              onError={() => setError(true)}
              className={classes}
            />
          )}
          {children
            ? children
            : (!src || error) && (
                <h3 className="uppercase">{getInitials(name)}</h3>
              )}
        </Component>
        {displayPresence && (
          <span
            className={`absolute z-10 ${
              presencePositionClassName
                ? presencePositionClassName
                : (presencePosition[presenceSize!] as string)
            }`}
          >
            {displayPresence}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
