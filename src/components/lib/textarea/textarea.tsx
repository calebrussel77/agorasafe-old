import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import React, { ReactElement, forwardRef } from 'react';

import { Variant } from '@helpers/variants';

import { Spinner } from '../spinner/spinner';

const textarea = cva(
  [
    'w-full focus:caret-primary-500 focus:outline-none rounded-md focus:border-0 disabled:cursor-not-allowed disabled:bg-gray-200',
    'disabled:opacity-70 disabled:cursor-not-allowed',
    'transition duration-300 ease-in-out',
  ],
  {
    variants: {
      appareance: {
        primary: [
          'border-[1.5px] border-gray-300 placeholder:text-[#9ca3af]',
          'hover:bg-gray-100 disabled:hover:bg-gray-200 disabled:bg-gray-200',
          'focus:outline-none focus:caret-primary-500 focus:bg-transparent focus:ring-1 focus:ring-primary-500 focus:border-primary-500',
        ],
        secondary: [
          'border-[1.5px] border-gray-300 placeholder:text-[#9ca3af]',
          'hover:bg-gray-100 disabled:hover:bg-gray-200 disabled:bg-gray-200',
          'focus:outline-none focus:caret-secondary-500 focus:bg-transparent focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500',
        ],
        subtle: [
          'bg-transparent border-none border-0 placeholder:text-[#9ca3af]',
          'hover:bg-slate-50 disabled:hover:bg-transparent',
          'focus:outline-none focus:border-0 focus:ring-0 focus-within:border-0',
        ],
      },
      size: {
        xs: ['text-xs', 'py-1', 'px-2'],
        sm: ['text-sm', 'py-1.5', 'px-2'],
        md: ['text-sm', 'py-2', 'px-3'],
        lg: ['text-lg', 'py-2', 'px-4'],
        xl: ['text-xl', 'py-2.5', 'px-4'],
      },
    },
    compoundVariants: [{ appareance: 'primary', size: 'md' }],
    defaultVariants: {
      appareance: 'primary',
      size: 'md',
    },
  }
);

export type InputProps = React.HTMLProps<HTMLTextAreaElement> & {
  setParentValue?: any;
  iconBefore?: ReactElement;
  isLoding?: boolean;
  iconAfter?: ReactElement;
  variant?: Variant;
};

export type TextareaProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof textarea> &
  React.ComponentPropsWithRef<'textarea'> &
  InputProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      setParentValue,
      iconBefore,
      appareance,
      iconAfter,
      isLoding,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const hasError = variant === 'danger';

    const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setParentValue && setParentValue(e.target.value);
    };

    return (
      <div className="relative w-full">
        {iconBefore && (
          <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3">
            {iconBefore}
          </div>
        )}
        <textarea
          ref={ref}
          rows={3}
          cols={3}
          style={{ borderColor: hasError && 'red' }}
          value={props.value}
          onChange={handleOnchange}
          className={textarea({
            appareance,
            size,
            class: clsx(
              iconBefore && 'pl-10',
              (iconAfter || isLoding) && 'pr-10',
              className
            ),
          })}
          {...props}
        />
        {isLoding ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Spinner className="h-5 w-5" />
          </div>
        ) : (
          iconAfter && (
            <div className="pointer-events-none text-gray-400 absolute inset-y-0 right-0 flex items-center pr-3">
              {iconAfter}
            </div>
          )
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
