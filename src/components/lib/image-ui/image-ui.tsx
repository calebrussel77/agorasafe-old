/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ImageProps } from 'next/dist/client/image';
import Image from 'next/image';
import React, { CSSProperties, forwardRef, useState } from 'react';
import { HiPhoto } from 'react-icons/hi2';

import { blurDataURL } from '@helpers/image';
import { cn } from '@helpers/misc';
import { stringToHslColor } from '@helpers/misc';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const DEFAULT_FONT_SIZE = 16;
const toRem = (px: number) => `${px / DEFAULT_FONT_SIZE}rem`;

/**
 * USAGE OF THE COMPONENT
 *
 * <ImageUI name={title} src={cover} h={120} w="100%" />
 *
 */
export interface ImageUIOptions {
  //display background color of the image by default
  color?: string | CSSProperties['backgroundColor'];

  //The name of the image also use for alt prop
  name: string;

  //The size of the image already predefine
  size?: Size;

  //The image url
  src: string;

  //The fontSize of the error text message
  fontSize?: number;

  //The shape
  shape?: 'rounded' | 'circle' | 'square';

  //used it if the image url doesn't need an api base url prefix
  noNeedApiPrefix?: boolean;

  //The position of the image display
  position?: 'top' | 'center' | 'bottom';
}

export type ImageUIProps = Omit<ImageProps, 'alt'> & ImageUIOptions;

export const ImageUI = forwardRef<HTMLDivElement, ImageUIProps>(
  (
    {
      color,
      fontSize,
      name,
      shape = 'square',
      size = 'md',
      position = 'center',
      src,
      className,
      noNeedApiPrefix = true,
      ...rest
    },
    ref
  ) => {
    const backgroundColor = color || stringToHslColor(name);
    const sizes = {
      xs: toRem(30),
      sm: toRem(40),
      md: toRem(50),
      lg: toRem(60),
      xl: toRem(70),
      xxl: toRem(80),
    };

    const imageSize = sizes[size];
    const imageFontSize = fontSize || `calc(${imageSize} / 2.5)`;
    const [error, setError] = useState(false);
    const imageSrc = src;
    const isEmpty = error || !src;

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
      <div
        aria-label={name}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: '0',
          fontSize: imageFontSize,
          fontWeight: 'bold',
          borderRadius:
            shape === 'circle'
              ? '9999px'
              : shape === 'square'
              ? '0px'
              : '0.375rem',
        }}
        ref={ref}
        role="img"
        className={cn(
          className,
          `flex overflow-hidden`,
          isEmpty && 'bg-gray-100'
        )}
        {...rest}
      >
        {!isEmpty && (
          <Image
            alt={name}
            src={imageSrc}
            blurDataURL={blurDataURL()}
            fill
            style={{
              borderRadius:
                shape === 'circle'
                  ? '9999px'
                  : shape === 'square'
                  ? '0px'
                  : '0.375rem',
            }}
            placeholder="blur"
            onError={() => setError(true)}
            className={classes}
          />
        )}

        {isEmpty && (
          <HiPhoto className=" text-gray-400 flex-shrink-0 h-10 w-10 m-auto" />
        )}
      </div>
    );
  }
);

ImageUI.displayName = 'ImageUI';
