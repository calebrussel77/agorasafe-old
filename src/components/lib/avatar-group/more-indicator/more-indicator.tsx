import React, { forwardRef, useCallback } from 'react';

import { Avatar, AvatarProps } from '../../avatar/avatar';

export type MoreIndicatorProps = AvatarProps & {
  count: number;
  buttonProps?: Partial<React.HTMLAttributes<HTMLElement>>;
};
const MAX_DISPLAY_COUNT = 99;

export const MoreIndicator = forwardRef<HTMLDivElement, MoreIndicatorProps>(
  ({ count, onClick, buttonProps = {}, ...rest }, ref) => {
    const onClickHander = useCallback(
      (event: React.MouseEvent<any>) => {
        if (buttonProps.onClick) {
          buttonProps.onClick(event);
        }
        onClick?.(event);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [buttonProps.onClick, onClick]
    );

    return (
      <Avatar
        {...rest}
        ref={ref}
        onClick={onClickHander}
        name={'button more'}
        {...buttonProps}
      >
        +{count! > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count}
      </Avatar>
    );
  }
);

MoreIndicator.displayName = 'MoreIndicator';
