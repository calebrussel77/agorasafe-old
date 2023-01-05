/* eslint-disable no-undef */
import {PopoverDisclosure, PopoverDisclosureProps} from 'ariakit';
import React, {forwardRef, useLayoutEffect, useRef} from 'react';

import {UsePopoverStateOptions} from '../usePopoverState';

export type As<Props = any> = React.ElementType<Props>;

type TriggerProps = PopoverDisclosureProps &
  Pick<
    UsePopoverStateOptions,
    'triggerMethod' | 'withCloseButton' | 'state'
  > & {disclosure?: React.ReactElement<any>};

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      triggerMethod = 'click',
      disclosure,
      state,
      withCloseButton = false,
      ...props
    },
    ref
  ) => {
    const hoverable = triggerMethod === 'hover';
    const disclosureRef = useRef<HTMLButtonElement>(null) as any;
    const popoverRef = state.popoverRef;

    const showPopover: () => void = () => {
      if (hoverable) {
        // remove listeners on mouseenter
        disclosureRef.current?.removeEventListener('mouseenter', showPopover);
        popoverRef.current?.removeEventListener('mouseenter', showPopover);
        // add listeners on mouseleave
        disclosureRef.current?.addEventListener('mouseleave', hidePopover);
        popoverRef.current?.addEventListener('mouseleave', hidePopover);
        // show popover
        state.show();
      }
    };

    const setRef = (triggerElement: HTMLButtonElement) => {
      disclosureRef.current = triggerElement;
      state.disclosureRef.current = triggerElement;
      if (typeof ref === 'function') {
        ref(triggerElement);
      } else if (ref?.current) {
        ref.current = triggerElement;
      }
    };

    const hidePopover: () => void = () => {
      if (hoverable) {
        // remove listeners on mouseleave
        disclosureRef.current?.removeEventListener('mouseleave', hidePopover);
        popoverRef.current?.removeEventListener('mouseleave', hidePopover);
        // add listeners on mouseenter
        disclosureRef.current?.addEventListener('mouseenter', showPopover);
        popoverRef.current?.addEventListener('mouseenter', showPopover);
        // hide popover
        state.hide();
      }
    };

    useLayoutEffect(() => {
      const disclosure = disclosureRef.current;
      if (hoverable && disclosure) {
        // add listeners on mount
        disclosure.addEventListener('mouseenter', showPopover);
        disclosure.addEventListener('mouseleave', hidePopover);
        return () => {
          // remove listeners on unmount
          disclosure.removeEventListener('mouseenter', showPopover);
          disclosure.removeEventListener('mouseleave', hidePopover);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disclosureRef]);

    if (disclosure) {
      return (
        <PopoverDisclosure state={state} ref={setRef} {...props}>
          {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
        </PopoverDisclosure>
      );
    }

    return <PopoverDisclosure state={state} ref={setRef} {...props} />;
  }
);

Trigger.displayName = 'Trigger';
