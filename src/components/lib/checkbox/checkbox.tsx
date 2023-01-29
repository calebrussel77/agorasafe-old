import {type VariantProps, cva} from 'class-variance-authority';
import React, {forwardRef, useEffect} from 'react';
import {mergeRefs} from 'react-merge-refs';
import {twMerge} from 'tailwind-merge';

import {Variant, getVariantColor} from '@helpers/variants';

const checkboxToken = cva(
  'rounded border-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed',
  {
    variants: {
      appareance: {
        primary: ['text-primary-600 focus:ring-primary-500'],
        secondary: ['text-secondary-600 focus:ring-secondary-500'],
        subtle: ['text-gray-600 focus:ring-gray-500'],
      },
      size: {
        xs: ['h-2 w-2'],
        sm: ['h-3 w-3'],
        md: ['h-4 w-4'],
        lg: ['h-5 w-5'],
        xl: ['h-6 w-6'],
      },
    },
    compoundVariants: [{appareance: 'primary', size: 'md'}],
    defaultVariants: {
      appareance: 'primary',
      size: 'md',
    },
  }
);

export type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  loading?: boolean;
  autoFocus?: boolean;
  variant?: Variant;
};

export type CheckboxGlobalProps = VariantProps<typeof checkboxToken> &
  CheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxGlobalProps>(
  (
    {
      className,
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
    const localRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (autoFocus) {
        localRef.current.focus();
      }
    }, [autoFocus]);

    return (
      <input
        ref={mergeRefs([localRef, ref])}
        disabled={disabled || loading}
        autoFocus={autoFocus}
        type="checkbox"
        aria-invalid={variant === 'danger' ? 'true' : 'false'}
        className={twMerge(
          checkboxToken({
            appareance,
            size,
          }),
          className,
          variant && getVariantColor(variant)
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
