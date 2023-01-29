import {type VariantProps, cva} from 'class-variance-authority';
import React, {forwardRef} from 'react';
import {twMerge} from 'tailwind-merge';

import {VARIANTS_COLORS, Variant} from '@helpers/variants';

const variantMessageToken = cva([''], {
  variants: {
    size: {
      sm: ['text-xs'],
      md: ['text-sm'],
      lg: ['text-lg'],
      xl: ['text-xl'],
    },
  },
  compoundVariants: [{size: 'md'}],
  defaultVariants: {
    size: 'md',
  },
});

export type VariantMessageGlobalProps = VariantProps<
  typeof variantMessageToken
> &
  React.HTMLProps<HTMLDivElement> & {variant?: Variant};

export const VariantMessage = forwardRef<
  HTMLDivElement,
  VariantMessageGlobalProps
>(({children, className, variant, size, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={variantMessageToken({
        size,
        class: twMerge(className, VARIANTS_COLORS[variant]),
      })}
      {...props}
    >
      {children}
    </div>
  );
});

VariantMessage.displayName = 'VariantMessage';
