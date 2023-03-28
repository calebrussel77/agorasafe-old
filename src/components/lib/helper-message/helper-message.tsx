import { type VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode, forwardRef } from 'react';

import { cn } from '@helpers/misc';

const helperMessageToken = cva(['whitespace-normal'], {
  variants: {
    size: {
      sm: ['text-xs text-gray-400'],
      md: ['text-xs text-gray-400'],
      lg: ['text-sm text-gray-400'],
      xl: ['text-md text-gray-400'],
    },
  },
  compoundVariants: [{ size: 'md' }],
  defaultVariants: {
    size: 'md',
  },
});

export type HelperMessageGlobalProps = VariantProps<
  typeof helperMessageToken
> & { className?: string; children: ReactNode };

export const HelperMessage = forwardRef<
  HTMLDivElement,
  HelperMessageGlobalProps
>(({ children, className, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
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
