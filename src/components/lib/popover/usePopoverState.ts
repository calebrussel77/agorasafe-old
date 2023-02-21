/* eslint-disable no-undef */
import {
  PopoverState,
  PopoverStateProps,
  usePopoverState as useAriakitPopoverState,
} from 'ariakit';
import { useCallback, useRef } from 'react';

export interface UsePopoverStateOptions {
  hideTimeout?: number;
  showTimeout?: number;
  triggerMethod?: 'hover' | 'click';
  withCloseButton?: boolean;
  state: PopoverState;
}
export type UsePopoverStateReturn = Pick<
  UsePopoverStateOptions,
  'triggerMethod' | 'withCloseButton' | 'state'
>;

export const usePopoverState = ({
  animated = 150,
  hideTimeout = 300,
  showTimeout = 500,
  triggerMethod = 'click',
  withCloseButton = false,
  ...options
}: PopoverStateProps & Omit<UsePopoverStateOptions, 'state'> = {}) => {
  const popover = useAriakitPopoverState({ animated, gutter: 8, ...options });
  const closeCountdownRef = useRef<NodeJS.Timeout>();
  const openCountdownRef = useRef<NodeJS.Timeout>();
  const isHoverable = triggerMethod === 'hover';

  const hide = useCallback(() => {
    if (isHoverable) {
      if (!popover.open && openCountdownRef.current) {
        clearTimeout(openCountdownRef.current);
      }
      closeCountdownRef.current = setTimeout(() => popover.hide(), hideTimeout);
    } else {
      popover.hide();
    }
  }, [isHoverable, popover, hideTimeout]);

  const show = useCallback(() => {
    if (isHoverable) {
      openCountdownRef.current = setTimeout(() => popover.show(), showTimeout);
      if (closeCountdownRef.current) {
        clearTimeout(closeCountdownRef.current);
      }
    } else {
      popover.show();
    }
  }, [isHoverable, showTimeout, popover]);

  return {
    popover: {
      triggerMethod,
      withCloseButton,
      state: popover,
    },
    hide,
    show,
  };
};
