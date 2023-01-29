/* eslint-disable no-undef */

/**
 * ------------ USAGE OF THE COMPONENT-----------------
  const dialog = useModalState();
 * 
 * 
      <Modal
        state={dialog}
        onClose={onCloseDialog}
        initialFocusRef={initialFocusRef}
        className="md:w-[630px] 2xl:w-[650px]"
      >
        <Modal.Header title={`Send Message to ${relationship?.name}`}>
          {isError && <SectionMessage title={error?.message} />}
        </Modal.Header>
        <Modal.Body>
          <ButtonItem
            hovered={false}
            iconBefore={
              <Avatar
                name={relationship?.name}
                imgUrl={relationship?.avatar}
                className="h-10 w-10 flex-shrink-0"
              />
            }
          >
            {relationship?.name}
          </ButtonItem>
          <CreateConversationForm
            initialFocusRef={initialFocusRef}
            onSubmit={onSubmit}
          />
        </Modal.Body>
      </Modal>
 * 
 */
import {
  Dialog,
  DialogDisclosure,
  DialogOptions,
  DialogState,
  DialogStateProps,
  useDialogState,
} from 'ariakit/dialog';
import clsx from 'clsx';
import React, {
  Children,
  ReactNode,
  cloneElement,
  forwardRef,
  useRef,
} from 'react';

import {CloseButton} from './close-button/close-button';
import {Footer} from './footer/footer';
import {Header} from './header/header';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'auto';

const SizeStyles = {
  xs: 'w-full md:w-[630px] 2xl:w-[650px]',
  sm: 'w-full md:w-[630px] 2xl:w-[650px]',
  md: 'w-full md:w-[630px] 2xl:w-[650px]',
  lg: 'w-full md:w-[630px] 2xl:w-[650px]',
  auto: 'md:w-auto',
};
export interface ModalOptions {
  ariaLabel?: string;
  closeElement?: React.ElementType;
  onClose?: () => void;
  className?: string;
  hasCloseButton?: boolean;
  size?: Size;
  state: DialogState;
  children: JSX.Element | JSX.Element[];
}

export type ModalProps = DialogOptions<'div'> & ModalOptions;
export type ModalInitialState = DialogStateProps;
export type ModalStateReturn = DialogState;

export function useModalState(options?: ModalInitialState): ModalStateReturn {
  return useDialogState({animated: true, ...options});
}

const ModalComponent = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      ariaLabel,
      children,
      state,
      className,
      hasCloseButton = true,
      onClose,
      closeElement: CloseElement = CloseButton,
      size = 'md',
      ...rest
    },
    ref
  ) => {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const footerRef = useRef(null);

    const setRef = (name?: string) => {
      if (name === 'Header') {
        return headerRef;
      }

      if (name === 'Content') {
        return contentRef;
      }

      if (name === 'Footer') {
        return footerRef;
      }

      return undefined;
    };

    const closeModal = () => {
      onClose?.();
      state.hide();
    };

    return (
      <Dialog
        state={{
          ...state,
          hide: closeModal,
        }}
        aria-label={ariaLabel}
        ref={ref}
        className={clsx(
          'dialog flex flex-col my-10  border justify-between overflow-hidden rounded-md bg-white',
          SizeStyles[size],
          className
        )}
        {...rest}
      >
        {hasCloseButton && <CloseElement onClick={closeModal} />}
        {Children.map(children, (child: JSX.Element) => {
          if (!child) return null;
          const name = child?.type?.displayName || child?.type?.name;

          return cloneElement(child, {
            ref: setRef(name),
            ...child.props,
          });
        })}
      </Dialog>
    );
  }
);

ModalComponent.displayName = 'ModalComponent';
type ContentProps = {
  className?: string;
  children?: ReactNode;
};

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({className, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'h-full w-full px-4 scrollbar__custom flex-1 py-6 overflow-y-auto',
          className
        )}
        {...props}
      />
    );
  }
);

Content.displayName = 'Content';

// Nested exports
export const Modal = Object.assign(ModalComponent, {
  Trigger: DialogDisclosure,
  Header,
  Body: Content,
  Footer,
});
