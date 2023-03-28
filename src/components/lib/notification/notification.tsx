import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import React, {
  ComponentProps,
  ComponentPropsWithRef,
  ReactElement,
  forwardRef,
} from 'react';
import { HiXMark } from 'react-icons/hi2';

import { cn } from '@helpers/misc';
import { VariantIcon } from '@helpers/variant-icons';
import { VARIANTS_COLORS, Variant } from '@helpers/variants';

import { InlineUI } from '../inline-ui/inline-ui';

const notificationToken = cva(['w-full'], {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-md'],
      lg: ['text-lg'],
      xl: ['text-xl'],
    },
  },
  compoundVariants: [{ size: 'md' }],
  defaultVariants: {
    size: 'md',
  },
});

export type NotificationGlobalProps = VariantProps<typeof notificationToken> &
  Omit<ComponentPropsWithRef<'div'>, 'title'> & {
    variant?: Variant;
    title?: string | ReactElement;
    description?: string | ReactElement;
    icon?: ReactElement;
    closeToast?: () => void;
    actions?: Array<ReactElement<any>> | ReactElement<any>;
    hasCloseButton?: boolean;
    toastProps?: any;
  };

const NotifBody = ({ title, description, actions }) => {
  const isTitleString = typeof title === 'string';
  const isDescriptionString = typeof description === 'string';
  const isActionsArray = Array.isArray(actions);

  const hasMoreThanOneAction = isActionsArray && actions.length > 1;
  const hasOneAction = !isActionsArray || actions.length === 1;

  return (
    <div
      className={clsx('ml-3 w-0 flex-1', hasOneAction && 'flex items-start')}
    >
      <div>
        {isTitleString ? (
          <p className="text-sm font-medium text-gray-900">{title}</p>
        ) : (
          title
        )}
        {isDescriptionString ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : (
          description
        )}
        {hasMoreThanOneAction && (
          <InlineUI className="gap-3 mt-1.5">{actions}</InlineUI>
        )}
      </div>
      {hasOneAction && (
        <span className="ml-3 text-gray-700 font-medium">{actions}</span>
      )}
    </div>
  );
};

const CloseButton = ({ closeToast }) => {
  return (
    <button
      type="button"
      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={closeToast}
    >
      <span className="sr-only">Close</span>
      <HiXMark className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export const Notification = forwardRef<HTMLDivElement, NotificationGlobalProps>(
  (
    {
      hasCloseButton = true,
      className,
      variant,
      closeToast,
      title,
      description,
      actions,
      size,
      toastProps,
      icon,
      ...props
    },
    ref
  ) => {
    const hasVariant = !!variant;
    const isDefault = !hasVariant && !icon;

    return (
      <div
        ref={ref}
        className={notificationToken({
          size,
          class: cn(className),
        })}
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start">
            {!isDefault && (
              <VariantIcon
                icon={icon}
                variant={variant}
                className="h-6 w-6"
                aria-hidden="true"
              />
            )}
            <NotifBody
              title={title}
              description={description}
              actions={actions}
            />

            {hasCloseButton && (
              <div className="ml-4 flex flex-shrink-0">
                <CloseButton closeToast={closeToast} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Notification.displayName = 'Notification';
