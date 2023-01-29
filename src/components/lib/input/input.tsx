import {type VariantProps, cva} from 'class-variance-authority';
import React, {ReactElement, forwardRef, useEffect} from 'react';
import {mergeRefs} from 'react-merge-refs';
import {twMerge} from 'tailwind-merge';

import {VariantIcon} from '@helpers/variant-icons';
import {Variant} from '@helpers/variants';

import {BtnSpinner} from '../spinner/spinner';

const inputToken = cva(
  [
    'w-full rounded ',
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
    compoundVariants: [{appareance: 'primary', size: 'md'}],
    defaultVariants: {
      appareance: 'primary',
      size: 'md',
    },
  }
);

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  setParentValue?: any;
  iconBefore?: ReactElement;
  loading?: boolean;
  iconAfter?: ReactElement;
  variant?: Variant;
  autoFocus?: boolean;
};

export type InputGlobalProps = VariantProps<typeof inputToken> & InputProps;

const VARIANTS_BORDER_COLORS: Record<Variant, string> = {
  danger: 'border-red-500',
  focused: 'border-primary-500',
  info: 'border-blue-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  system: 'border-secondary-500',
};

export const Input = forwardRef<HTMLInputElement, InputGlobalProps>(
  (
    {
      className,
      setParentValue,
      iconBefore,
      iconAfter,
      loading,
      disabled,
      variant,
      appareance,
      size,
      autoFocus,
      ...props
    },
    ref
  ) => {
    const hasElementAfter = iconAfter || loading;
    const localRef = React.useRef<HTMLInputElement>(null);
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setParentValue && setParentValue(e.target.value);
    };

    useEffect(() => {
      if (autoFocus) {
        localRef.current.focus();
      }
    }, [autoFocus]);

    return (
      <div className="relative w-full">
        {iconBefore && (
          <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3">
            {iconBefore}
          </div>
        )}
        <input
          ref={mergeRefs([localRef, ref])}
          autoFocus={autoFocus}
          disabled={disabled || loading}
          onChange={handleOnchange}
          aria-invalid={variant === 'danger' ? 'true' : 'false'}
          className={twMerge(
            inputToken({
              appareance,
              size,
            }),
            className,
            iconBefore && 'pl-10',
            hasElementAfter && 'pr-10',
            //!TODO Need to find why getting the exported constant doesn't reflects on the screen
            variant && VARIANTS_BORDER_COLORS[variant]
          )}
          {...props}
        />

        {hasElementAfter && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {loading ? (
              <BtnSpinner className="h-5 w-5" aria-hidden="true" />
            ) : (
              <VariantIcon icon={iconAfter} />
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
