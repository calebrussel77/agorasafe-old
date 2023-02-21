import clsx from 'clsx';
import React from 'react';
import { useCss } from 'react-use';

import { ButtonProps } from '../button';

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> &
  ButtonProps;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  variant,
  size,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const defaultClassName = useCss({
    display: 'inline-flex',
    'flex-wrap': 'wrap',
    'align-items': 'center',
    'margin-top': '-3px',
    '> *': {
      'margin-top': '3px',
      '&:not(:only-child)': {
        '&:not(:last-child)': {
          'border-right-color': 'rgba(255, 255, 255, 0.4)',
        },
        '&:first-child': {
          'border-top-right-radius': 0,
          'border-bottom-right-radius': 0,
        },
        '&:last-child': {
          'border-top-left-radius': 0,
          'border-bottom-left-radius': 0,
        },
        '&:not(:last-child):not(:first-child)': {
          'border-radius': 0,
        },
      },
    },
  });

  function setGlobalProps(children: any) {
    return React.Children.toArray(children)
      .filter(Boolean)
      .map((child: React.ReactElement<ButtonProps>) => {
        return React.cloneElement(child, {
          ...child.props,
          size: size || child.props.size,
          variant: variant || child.props.variant,
          disabled: disabled || child.props.disabled,
          onClick: onClick || child.props.onClick,
        });
      });
  }

  return (
    <div
      role="group"
      className={clsx(defaultClassName, className)}
      {...(props as any)}
    >
      {setGlobalProps(children)}
    </div>
  );
};
