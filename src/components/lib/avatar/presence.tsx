import {type VariantProps, cva} from 'class-variance-authority';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

export const presenceDiv = cva(['rounded-full flex-shrink-0'], {
  variants: {
    presence: {
      online: ['bg-green-500 ring-1 ring-white'],
      busy: ['bg-red-500 ring-1 ring-white'],
    },
    presenceSize: {
      xs: ['h-1 w-1'],
      sm: ['h-2 w-2'],
      md: ['h-3 w-3'],
      lg: ['h-4 w-4'],
      xl: ['h-5 w-5'],
    },
  },
  compoundVariants: [{presence: 'online', presenceSize: 'sm'}],
  defaultVariants: {
    presence: 'online',
    presenceSize: 'sm',
  },
});

export type PresenceProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof presenceDiv> &
  React.ComponentPropsWithRef<'div'>;

export const Presence = forwardRef<HTMLDivElement, PresenceProps>(
  ({className, presence, presenceSize, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={presenceDiv({
          presence,
          presenceSize,
          class: clsx(className),
        })}
        {...props}
      />
    );
  }
);
Presence.displayName = 'Presence';
