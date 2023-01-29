import React, {JSXElementConstructor, ReactElement, ReactNode} from 'react';

import {VariantIcon} from '@helpers/variant-icons';
import {Variant} from '@helpers/variants';

import {Tooltip, TooltipProps} from '../tooltip/tooltip';

type InlineMessageProps = {
  title?: string;
  secondaryText?: string;
  containerClassName?: string;
  iconOpenClassName?: string;
  iconDisplayClassName?: string;
  className?: string;
  variant?: Variant;
  triggerBtnClassName?: string;
  icon?: ReactElement<{open: boolean}, string | JSXElementConstructor<any>>;
  children: ReactElement | ReactNode;
};

export const InlineMessage = ({
  title,
  children,
  secondaryText,
  variant = 'info',
  icon,
  containerClassName = '',
  triggerBtnClassName = '',
  ...rest
}: InlineMessageProps & TooltipProps) => {
  return (
    <Tooltip
      title={title}
      offsetY={10}
      position="bottom center"
      on={['click']}
      keepTooltipInside
      trigger={open => (
        <button
          className={`${triggerBtnClassName} inline-flex items-center space-x-1 group`}
        >
          <VariantIcon icon={icon} size="md" variant={variant} />
          {title && (
            <h3 className="font-bold group-hover:underline text-sm whitespace-nowrap">
              {title}
            </h3>
          )}
          {secondaryText && (
            <h3 className="ml-2 group-hover:underline text-sm">
              {secondaryText}
            </h3>
          )}
        </button>
      )}
      className={`${containerClassName} bg-white text-brand-gray-100  border border-gray-300 text-sm`}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};
