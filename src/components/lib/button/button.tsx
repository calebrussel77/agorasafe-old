// button.tsx
import {type VariantProps, cva} from 'class-variance-authority';
import React from 'react';

const button = cva('', {
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
        'bg-gray-900/5 border border-sm',
        'text-gray-900',
        'hover:bg-gray-900/10 focus:ring-2 focus:ring-gray-500',
      ],
      link: [
        'bg-white',
        'text-primary-600',
        'border-primary-400',
        'hover:underline hover:text-primary-500',
      ],
      'subtle-link': [
        'bg-white',
        'text-gray-900',
        'border-gray-400',
        'hover:underline',
      ],
    },
    size: {
      sm: ['text-sm', 'py-1.5', 'px-2'],
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
    variant: 'subtle',
    size: 'md',
    shape: 'rounded',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  shape,
  ...props
}) => (
  <button
    className={button({variant, size, shape, class: className})}
    {...props}
  />
);
