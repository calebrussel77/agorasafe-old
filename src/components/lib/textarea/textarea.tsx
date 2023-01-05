import {type VariantProps, cva} from 'class-variance-authority';
import clsx from 'clsx';
import React, {ReactElement, forwardRef} from 'react';

import {BtnSpinner} from '../spinner/Spinner';

const textarea = cva(
  [
    'w-full focus:caret-primary-500 focus:outline-none focus:border-0 disabled:cursor-not-allowed disabled:bg-gray-200',
    'disabled:opacity-70 disabled:cursor-not-allowed',
    'transition duration-300 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-2 border-gray-300 placeholder:text-[#9ca3af]',
          'hover:bg-gray-100 disabled:hover:bg-gray-200',
          'required:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        ],
        subtle: [
          'bg-transparent border-none border-0 placeholder:text-[#9ca3af]',
          'hover:bg-slate-50 disabled:hover:bg-transparent',
          'required:border-red-500 focus:border-0 focus:ring-0 focus-within:border-0',
        ],
      },
      size: {
        xs: ['text-xs', 'py-1', 'px-2'],
        sm: ['text-sm', 'py-1.5', 'px-2'],
        md: ['text-[13px]', 'py-2.5', 'px-2'],
        lg: ['text-lg', 'py-3', 'px-4'],
        xl: ['text-xl', 'py-3', 'px-4'],
      },
    },
    compoundVariants: [{variant: 'default', size: 'md'}],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type InputProps = React.HTMLProps<HTMLTextAreaElement> & {
  setParentValue?: any;
  iconBefore?: ReactElement;
  isLoding?: boolean;
  iconAfter?: ReactElement;
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
      iconAfter,
      isLoding,
      variant,
      size,
      ...props
    },
    ref
  ) => {
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
          value={props.value}
          onChange={handleOnchange}
          className={textarea({
            variant,
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
            <BtnSpinner className="h-5 w-5" />
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
