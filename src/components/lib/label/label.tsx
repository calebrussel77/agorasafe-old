/* eslint-disable no-undef */
import { forwardRef } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi2';

import { cn } from '@helpers/misc';
import { VariantIcon } from '@helpers/variant-icons';
import { Variant, getVariantColor } from '@helpers/variants';
import { wrapChildren } from '@helpers/wrap-children';

export interface LabelOptions {
  checkableField?: boolean;
  disabled?: boolean;
  disabledIcon?: JSX.Element;
  icon?: JSX.Element;
  variant?: Variant;
  required?: boolean;
  withDisabledIcon?: boolean;
  htmlFor?: string;
}

export type LabelProps = React.HtmlHTMLAttributes<HTMLLabelElement> &
  LabelOptions;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      checkableField,
      children,
      disabled,
      disabledIcon,
      icon,
      variant,
      withDisabledIcon = true,
      className,
      required,
      ...rest
    },
    ref
  ) => {
    // Wrap strings in span to allow for required asterisk
    const content = wrapChildren(children as JSX.Element);

    return (
      <label
        className={cn(
          'relative flex flex-shrink-0 max-w-full items-center select-none',
          required &&
            "after:content-['*'] after:text-red-500 after:font-bold after:ml-1",
          getVariantColor(variant),
          className
        )}
        ref={ref}
        {...rest}
      >
        <>
          {!checkableField && (
            <VariantIcon icon={icon} size="sm" variant={variant} />
          )}
          {disabled && withDisabledIcon && (
            <div className="inline-flex mr-1">
              {disabledIcon || <HiOutlineLockClosed className="h-4 w-4" />}
            </div>
          )}
          {content}
        </>
      </label>
    );
  }
);

Label.displayName = 'Label';
