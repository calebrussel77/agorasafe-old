/* eslint-disable no-undef */
import clsx from 'clsx';
import React, { forwardRef, useMemo } from 'react';
import { HiCheckCircle, HiInformationCircle, HiXCircle } from 'react-icons/hi';
import { HiExclamationTriangle } from 'react-icons/hi2';

import { VARIANTS_COLORS, Variant as VariantFromUtils } from './variants';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type Variant = VariantFromUtils | 'default';

const styles = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
  xl: 'h-8 w-8',
  xxl: 'h-9 w-9',
};
export interface VariantIconOptions {
  icon?: JSX.Element;
  size?: Size;
  variant?: Variant;
}

export type VariantIconProps = React.HTMLAttributes<HTMLElement> &
  VariantIconOptions;

export const VariantIcon = forwardRef<HTMLElement, VariantIconProps>(
  ({ icon, size = 'md', variant, className, ...rest }, ref) => {
    const Icon = useMemo(() => {
      if (icon === null) return null;
      if (icon) return icon;

      // if (variant === 'system') return <PictoKlimansBlueIcon />;
      if (variant === 'success') return <HiCheckCircle />;
      if (variant === 'info') return <HiInformationCircle />;
      if (variant === 'warning') return <HiExclamationTriangle />;
      if (variant === 'danger') return <HiXCircle />;
    }, [icon, variant]);

    return Icon
      ? React.cloneElement(Icon, {
          ...rest,
          className: clsx(styles[size], VARIANTS_COLORS[variant], className),
        })
      : null;
  }
);

VariantIcon.displayName = 'VariantIcon';
