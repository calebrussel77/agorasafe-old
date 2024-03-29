/* eslint-disable no-undef */
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from 'ariakit/disclosure';
import clsx from 'clsx';
import React, { ReactNode, cloneElement, forwardRef } from 'react';
import AnimateHeight from 'react-animate-height';
import { HiChevronRight } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export interface AccordionOptions {
  title: string | JSX.Element;
  icon?: JSX.Element;
  buttonClassName?: string;
  elementAfter?: JSX.Element | ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
}

type AccordionProps = Omit<React.ComponentProps<'div'>, 'title'> &
  AccordionOptions;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      icon = <HiChevronRight />,
      title,
      className,
      elementAfter,
      buttonClassName,
      defaultOpen = false,
      open,
      ...rest
    },
    ref
  ) => {
    const disclosure = useDisclosureState({
      defaultOpen,
      open,
      animated: true,
    });
    const isVisible = disclosure.open;

    return (
      <div ref={ref} className={twMerge('w-full', className)} {...rest}>
        <div>
          <Disclosure
            state={disclosure}
            className={twMerge(
              'w-full flex-1 flex items-center justify-between gap-2',
              buttonClassName
            )}
          >
            {title}
            {cloneElement(icon, {
              className: clsx(
                'h-5 w-5 transition duration-100 ease-in-out transform flex-shrink-0',
                isVisible && 'rotate-90'
              ),
            })}
          </Disclosure>
          {elementAfter && elementAfter}
        </div>
        <DisclosureContent state={disclosure}>
          <AnimateHeight
            animateOpacity
            duration={200}
            height={isVisible ? 'auto' : 0}
          >
            {children}
          </AnimateHeight>
        </DisclosureContent>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
