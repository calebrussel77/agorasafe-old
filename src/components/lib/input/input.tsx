import { type VariantProps, cva } from 'class-variance-authority';
import React, { ReactElement, forwardRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

import { VariantIcon } from '@helpers/variant-icons';
import { Variant, getVariantBorderColor } from '@helpers/variants';

import { useMergeRefs } from '@hooks/use-merge-refs/use-merge-refs';
import { useFocus } from '@hooks/useFocus/useFocus';

import { Spinner } from '../spinner/spinner';

const inputToken = cva(
  [
    'w-full rounded border',
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

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  setParentValue?: any;
  iconBefore?: ReactElement;
  loading?: boolean;
  iconAfter?: ReactElement;
  variant?: Variant;
  autoFocus?: boolean;
  shouldViewPasswordIcon?: boolean;
};

export type InputGlobalProps = VariantProps<typeof inputToken> & InputProps;

const RenderAfterElement = ({ loading, iconAfter }) => {
  return loading ? (
    <Spinner className="h-5 w-5" aria-hidden="true" />
  ) : (
    <VariantIcon icon={iconAfter} />
  );
};

const useTogglePasswordView = type => {
  const [newType, setNewType] = useState<string>(type);
  const isPasswordViewed = newType === 'text';

  const onToggleView = useCallback(() => {
    if (!isPasswordViewed) {
      setNewType('text');
      return;
    }
    setNewType('password');
  }, [isPasswordViewed]);

  const renderEyeButton = useCallback(
    () => (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <button type="button" onClick={onToggleView}>
          {isPasswordViewed ? (
            <HiOutlineEye className="h-5 w-5" />
          ) : (
            <HiOutlineEyeSlash className="h-5 w-5" />
          )}
        </button>
      </div>
    ),
    [isPasswordViewed, onToggleView]
  );

  return {
    render: renderEyeButton,
    isPasswordViewed,
    newType,
  };
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
      shouldViewPasswordIcon,
      variant,
      appareance,
      type,
      size,
      autoFocus,
      ...props
    },
    ref
  ) => {
    const hasElementAfter = iconAfter || loading;
    const { render, newType } = useTogglePasswordView(type);
    const { elementRef } = useFocus(autoFocus);
    const refs = useMergeRefs(elementRef, ref);
    const hasError = variant === 'danger';

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setParentValue && setParentValue(e.target.value);
    };

    return (
      <div className="relative w-full">
        {iconBefore && (
          <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3">
            {iconBefore}
          </div>
        )}
        <input
          ref={refs}
          style={{ borderColor: hasError && 'red' }}
          autoFocus={autoFocus}
          type={newType}
          disabled={disabled || loading}
          onChange={handleOnchange}
          aria-invalid={hasError ? 'true' : 'false'}
          className={twMerge(
            inputToken({
              appareance,
              size,
            }),
            iconBefore && 'pl-10',
            hasElementAfter && 'pr-10',
            className,
            variant && getVariantBorderColor(variant)
          )}
          {...props}
        />

        {hasElementAfter && !shouldViewPasswordIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <RenderAfterElement loading={loading} iconAfter={iconAfter} />
          </div>
        )}
        {shouldViewPasswordIcon && render()}
      </div>
    );
  }
);
Input.displayName = 'Input';
