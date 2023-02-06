import {VariantProps, cva} from 'class-variance-authority';
import React, {forwardRef} from 'react';
import {twMerge} from 'tailwind-merge';

import {getVariantBorderColor, getVariantColor} from '@helpers/variants';

import {HelperMessage} from '../helper-message/helper-message';
import {Label, LabelOptions} from '../label/label';

const inputRadioToken = cva([''], {
  variants: {
    appareance: {
      primary: [
        'border-gray-300 text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed',
      ],
      secondary: [
        'border-gray-300 text-secondary-600 focus:ring-secondary-500 disabled:cursor-not-allowed',
      ],
      subtle: [
        'border-gray-300 text-gray-600 focus:ring-gray-500 disabled:cursor-not-allowed',
      ],
    },
    size: {
      xs: ['h-2 w-2'],
      sm: ['h-3 w-3'],
      md: ['h-4 w-4'],
      lg: ['h-5 w-5'],
      xl: ['h-6 w-6'],
    },
    maxWidth: {
      xs: ['max-w-xs'],
      sm: ['max-w-sm'],
      md: ['max-w-md'],
      lg: ['max-w-lg'],
      xl: ['max-w-xl'],
    },
  },
  compoundVariants: [{appareance: 'primary', maxWidth: 'md', size: 'md'}],
  defaultVariants: {
    appareance: 'primary',
    maxWidth: 'md',
    size: 'md',
  },
});

const maxWidthClassNames = {
  xs: 'max-w-xs w-full',
  sm: 'max-w-sm w-full',
  md: 'max-w-md w-full',
  lg: 'max-w-lg w-full',
  xl: 'max-w-xl w-full',
};

export type RadioOptions = {
  hint?: string;
  label?: string;
  onChange?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  withHint?: boolean;
  dataTestId?: string;
  flexDirection?: 'column' | 'row';
};

export type InputRadioVariantProps = VariantProps<typeof inputRadioToken>;

export type RadioProps = React.HTMLProps<HTMLInputElement> &
  InputRadioVariantProps &
  RadioOptions &
  LabelOptions;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      dataTestId,
      disabled,
      disabledIcon,
      hint,
      label,
      onChange,
      onClick,
      variant,
      maxWidth,
      flexDirection,
      appareance,
      size,
      ...rest
    },
    ref
  ) => {
    const wrappperClassName =
      flexDirection === 'column'
        ? 'flex flex-col gap-2 items-center'
        : 'flex flex-row gap-2 items-center';

    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      event.stopPropagation();
      onClick && onClick(event);
      onChange && onChange(event);
    };

    return (
      <Label
        checkableField
        disabled={disabled}
        disabledIcon={disabledIcon}
        onClick={handleClick}
        variant={variant}
        className={twMerge(
          maxWidthClassNames[maxWidth],
          'flex flex-col items-start flex-1 '
        )}
        withDisabledIcon={false}
      >
        <div className={wrappperClassName}>
          <input
            ref={ref}
            data-testid={dataTestId}
            disabled={disabled}
            className={twMerge(
              inputRadioToken({
                appareance,
                size,
              }),
              variant && getVariantBorderColor(variant),
              variant && getVariantColor(variant)
            )}
            type="radio"
            {...rest}
          />
          <div>{label}</div>
        </div>
        {hint && (
          <HelperMessage className="text-gray-500">{hint}</HelperMessage>
        )}
      </Label>
    );
  }
);

Radio.displayName = 'Radio';
