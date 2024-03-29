// button.tsx
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { twMerge } from 'tailwind-merge';

import { Spinner } from '../spinner/spinner';

const button = cva(
  'gap-2 disabled:cursor-not-allowed transition ease-in-out duration-300',
  {
    variants: {
      variant: {
        light: [
          'bg-gray-100/40 shadow-md',
          'text-white',
          'border-transparent',
          'hover:bg-gray-100/60 focus:outline-none focus:ring-2 focus:ring-gray-500',
          'disabled:opacity-60',
        ],
        primary: [
          'bg-primary-600 shadow-primary-600/20 shadow-md',
          'text-white',
          'border-transparent',
          'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:opacity-60',
        ],
        secondary: [
          'bg-secondary-600 shadow-secondary-600/20 shadow-md',
          'text-white',
          'border-transparent',
          'hover:bg-secondary-700 focus:ring-2 focus:ring-secondary-500',
          'disabled:opacity-60',
        ],
        subtle: [
          'bg-white shadow-md border border-gray-300',
          'text-gray-900',
          'hover:bg-gray-100 focus:ring-2 focus:ring-gray-500',
          'disabled:opacity-60',
        ],
        link: [
          'bg-white',
          'text-primary-600',
          'border-primary-400',
          'hover:underline hover:text-primary-500',
          'disabled:opacity-60',
        ],
        'subtle-link': [
          'bg-transparent',
          'text-gray-900',
          'border-gray-400',
          'hover:bg-gray-100',
          'disabled:opacity-60',
        ],
      },
      size: {
        sm: ['text-base', 'py-1.5', 'px-3'],
        md: ['text-base', 'py-2', 'px-3'],
        lg: ['text-lg', 'py-2.5', 'px-4'],
        xl: ['text-xl', 'py-3', 'px-5'],
      },
      shape: {
        circle: ['rounded-full'],
        rounded: ['rounded-md'],
        square: ['rounded-none'],
      },
    },
    compoundVariants: [{ variant: 'primary', size: 'md', shape: 'rounded' }],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'rounded',
    },
  }
);

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> &
  React.ComponentPropsWithRef<'button'> & {
    loading?: boolean;
    skeleton?: boolean;
  };

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  disabled,
  shape,
  skeleton,
  loading,
  children,
  ...props
}) =>
  skeleton ? (
    <Skeleton className="min-w-[140px] h-9" />
  ) : (
    <button
      {...props}
      disabled={disabled || loading}
      className={twMerge(button({ variant, size, shape }), className)}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 flex-nowrap">
          <Spinner className="h-5 w-5 text-white" />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
