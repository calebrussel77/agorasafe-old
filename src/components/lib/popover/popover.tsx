import {
  Popover as AriakitPopover,
  PopoverProps as AriakitPopoverOptions,
} from 'ariakit/popover';
import clsx from 'clsx';
import React, {ReactNode, forwardRef} from 'react';
import {useCss} from 'react-use';

import {Trigger} from './popover-trigger/poover-trigger';
import {UsePopoverStateReturn} from './usePopoverState';

export interface PopoverOptions {
  /** call a function when popover closed */
  onClose?: () => void;
  /** the method to open and close the popover */
  triggerMethod?: UsePopoverStateReturn['triggerMethod'];
  /** show or hide a close button */
  withCloseButton?: boolean;
  /** Style the popover container */
  className?: string;
}

/**
 * ------------------ Usage of the component ------------
 *  
 * export function Example() {
  const {popover, hide, show} = usePopoverState({
    triggerMethod: 'hover',
  });

  return (
    <>
      <Popover.Trigger
           {...{...popover, state: popover.state}}
        disclosure={
              <CustomButton>
                <ChevronDownIcon
                  className={clsx(
                    'h-[21px] w-[21px] transition transform duration-200',
                    popover?.state?.open ? 'rotate-180' : ''
                  )}
                />
              </CustomButton>
            }
        className="button"
      />
      <Popover
           {...{...popover, state: popover.state}}
        aria-label="hover to open popover"
      >
       <Popover.Content>
        <h3 onClick={hide}>Salut les gars</h3>
          Praesent sit amet quam ac velit faucibus dapibus.
          <br />
          Quisque sapien ligula, rutrum quis aliquam nec, convallis sit amet
          erat.
          <br />
          Mauris auctor blandit porta.
           </Popover.Content>
      </Popover>
    </>
  );
}
 * 
 */
export type PopoverProps = PopoverOptions &
  AriakitPopoverOptions & {maxHeight?: number; maxWidth?: number};

export const PopoverComponent = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      onClose,
      // catch triggerMethod for it not to appear in the dom
      triggerMethod = 'click',
      maxHeight = 520,
      maxWidth = 420,
      className = '',
      withCloseButton = false,
      state,
      ...rest
    },
    ref
  ) => {
    const closePopover = () => {
      if (onClose) onClose();
      state?.hide();
    };

    const defaultCss = useCss({
      'min-width': '180px',
      opacity: '0',
      // transform: 'scaleY(0)',
      transition: 'opacity 150ms ease-in-out',
      '&[data-enter]': {opacity: '1'},
    });

    return (
      <AriakitPopover
        state={{...state, hide: closePopover}}
        ref={ref}
        style={{maxHeight: maxHeight, maxWidth: maxWidth}}
        className={clsx(
          'bg-white scrollbar__custom focus:outline-none focus-within:outline-none py-3 border rounded-md overflow-y-auto overflow-x-hidden z-[80] shadow-md',
          defaultCss,
          className
        )}
        {...rest}
      >
        {children}
      </AriakitPopover>
    );
  }
);

PopoverComponent.displayName = 'PopoverComponent';

type ContentProps = {
  className?: string;
  children?: ReactNode;
};

const Content = ({className = '', children}: ContentProps) => {
  return (
    <div
      className={clsx('w-full gap-y-1 gap-x-2 flex flex-col px-2', className)}
    >
      {children}
    </div>
  );
};

export const Popover = Object.assign(PopoverComponent, {
  Content: Content,
  Trigger: Trigger,
});

export * from './usePopoverState';
