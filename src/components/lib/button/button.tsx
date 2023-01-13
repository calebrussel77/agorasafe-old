// button.tsx
import {type VariantProps, cva} from 'class-variance-authority';
import React from 'react';
import {twMerge} from 'tailwind-merge';

import {BtnSpinner} from '../spinner/spinner';

const button = cva('gap-2 transition ease-in-out duration-300', {
  variants: {
    variant: {
      primary: [
        'bg-primary-600 shadow-primary-600/20 shadow-md',
        'text-white',
        'border-transparent',
        'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500',
      ],
      secondary: [
        'bg-secondary-600 shadow-secondary-600/20 shadow-md',
        'text-white',
        'border-transparent',
        'hover:bg-secondary-700 focus:ring-2 focus:ring-secondary-500',
      ],
      subtle: [
        'bg-white shadow-md',
        'text-gray-900',
        'hover:bg-gray-100 focus:ring-2 focus:ring-gray-500',
      ],
      link: [
        'bg-white',
        'text-primary-600',
        'border-primary-400',
        'hover:underline hover:text-primary-500',
      ],
      'subtle-link': [
        'bg-transparent',
        'text-gray-900',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
    },
    size: {
      sm: ['text-base', 'py-1.5', 'px-3'],
      md: ['text-base', 'py-2', 'px-3'],
      lg: ['text-lg', 'py-2.5', 'px-4'],
      xl: ['text-xl', 'py-3', 'px-5'],
    },
    shape: {
      pill: ['rounded-full'],
      rounded: ['rounded-md'],
      square: ['rounded-none'],
    },
  },
  compoundVariants: [{variant: 'primary', size: 'md', shape: 'rounded'}],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
  },
});

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> &
  React.ComponentPropsWithRef<'button'> & {isLoding?: boolean};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  disabled,
  shape,
  isLoding,
  children,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled || isLoding}
    className={twMerge(button({variant, size, shape}), className)}
  >
    {isLoding ? (
      <div className="flex items-center gap-2 flex-nowrap">
        <BtnSpinner className="h-5 w-5" />
        <span>{children}</span>
      </div>
    ) : (
      children
    )}
  </button>
);
