import React, {forwardRef} from 'react';
import Popup from 'reactjs-popup';
import {PopupProps} from 'reactjs-popup/dist/types';
import {twMerge} from 'tailwind-merge';

export interface TooltipOptions {
  children: React.ReactNode;
  className?: string;
}

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> &
  TooltipOptions &
  PopupProps;

export const Tooltip = forwardRef<any, TooltipProps>(
  (props, ref): React.ReactElement => {
    const {
      children,
      on = 'hover',
      position = 'top center',
      trigger,
      className,
      style,
      ...rest
    } = props;

    // If no content, simply return the children
    if (!children) {
      return trigger as React.ReactElement;
    }

    return (
      <Popup
        arrow={false}
        ref={ref}
        trigger={trigger}
        on={on}
        position={position}
        {...rest}
      >
        <div
          style={style}
          className={twMerge(
            'border shadow-md bg-gray-700 px-2 py-1 max-w-[200px] text-white text-xs',
            className
          )}
        >
          {children}
        </div>
      </Popup>
    );
  }
);

Tooltip.displayName = 'Tooltip';
