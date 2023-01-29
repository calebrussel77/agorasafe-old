import {type VariantProps, cva} from 'class-variance-authority';
import React, {forwardRef} from 'react';
import {twMerge} from 'tailwind-merge';

const helperMessageToken = cva([''], {
  variants: {
    size: {
      sm: ['text-xs text-gray-400'],
      md: ['text-xs text-gray-400'],
      lg: ['text-lg text-gray-400'],
      xl: ['text-xl text-gray-400'],
    },
  },
  compoundVariants: [{size: 'md'}],
  defaultVariants: {
    size: 'md',
  },
});

export type HelperMessageGlobalProps = VariantProps<typeof helperMessageToken> &
  React.HTMLProps<HTMLDivElement>;

export const HelperMessage = forwardRef<
  HTMLDivElement,
  HelperMessageGlobalProps
>(({children, className, size, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        helperMessageToken({
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

HelperMessage.displayName = 'HelperMessage';
