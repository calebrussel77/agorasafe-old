import { type VariantProps, cva } from 'class-variance-authority';
import React, { ReactElement, forwardRef, useState } from 'react';
import {
  HiCheckCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiOutlineXMark,
  HiQuestionMarkCircle,
} from 'react-icons/hi2';

import FadeAnimation from '../fade-animation/fade-animation';
import { InlineUI } from '../inline-ui/inline-ui';
import { MessageAction } from './section-message-action/section-message-action';

const sectionMessage = cva('w-full flex justify-center items-start gap-2', {
  variants: {
    appareance: {
      danger: [
        'bg-red-50 text-red-800',
        // 'border-transparent',
      ],
      discovery: [
        'bg-secondary-50 text-secondary-800',
        // 'border-transparent',
      ],
      success: [
        'bg-green-50 text-green-800',
        // 'border-transparent',
      ],
      warning: ['bg-yellow-50 text-yellow-800'],
      info: ['bg-blue-50 text-blue-800'],
      system: ['bg-primary-50 text-primary-800'],
    },
    size: {
      small: ['text-sm', 'py-1.5', 'px-4'],
      medium: ['text-base', 'py-2', 'px-4 sm:px-8'],
      large: ['text-lg', 'py-3', 'px-6'],
    },
  },
  compoundVariants: [{ appareance: 'danger', size: 'medium' }],
  defaultVariants: {
    appareance: 'danger',
    size: 'medium',
  },
});

type otherProps = {
  className?: string;
  title: string;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  actions?: Array<ReactElement<any>> | ReactElement<any>;
  hasCloseButton?: boolean;
};

const IconAppareances = {
  danger: {
    icon: HiInformationCircle,
    color: ' text-red-500',
  },
  success: {
    icon: HiCheckCircle,
    color: ' text-green-500',
  },
  discovery: {
    icon: HiQuestionMarkCircle,
    color: 'text-secondary-500',
  },
  system: {
    icon: HiCheckCircle,
    color: 'text-primary-500',
  },
  warning: {
    icon: HiExclamationTriangle,
    color: 'text-yellow-500',
  },
  info: { icon: HiInformationCircle, color: 'text-primary-500' },
};

export type SectionMessageProps = VariantProps<typeof sectionMessage> &
  otherProps &
  React.HTMLAttributes<HTMLDivElement>;

const SectionMessage = forwardRef<HTMLDivElement, SectionMessageProps>(
  (
    {
      className,
      appareance,
      onClose,
      hasCloseButton = true,
      size,
      title,
      actions,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const isActionsArray = Array.isArray(actions);

    const Icon = IconAppareances[appareance]
      ? IconAppareances[appareance]['icon']
      : HiInformationCircle;
    const ColorIcon = IconAppareances[appareance]
      ? IconAppareances[appareance]['color']
      : '';

    const toggleVisible = () => setVisible(false);

    return (
      <FadeAnimation
        ref={ref}
        visible={visible}
        animateEnter
        from={{ opacity: 0 }}
      >
        <div
          className={sectionMessage({ appareance, size, class: className })}
          {...props}
        >
          <div className="flex items-start flex-1 w-full gap-3">
            {<Icon className={`h-6 w-6 flex-shrink-0 ${ColorIcon}`} />}
            <div>
              {title && <h3 className="font-bold text-base">{title}</h3>}
              {children && <div className="text-[13px]">{children}</div>}
              <div className="flex items-center flex-wrap gap-1">
                {isActionsArray
                  ? actions?.length > 0 && (
                      <InlineUI
                        divider={
                          <span className="text-blue-100">&middot;</span>
                        }
                        className="gap-1"
                      >
                        {actions}
                      </InlineUI>
                    )
                  : actions}
              </div>
            </div>
          </div>
          {hasCloseButton && (
            <button
              onClick={onClose || toggleVisible}
              className="p-1 transform hover:scale-105 transition duration-150"
            >
              <HiOutlineXMark className="h-5 w-5 flex-shrink-0" />
            </button>
          )}
        </div>
      </FadeAnimation>
    );
  }
);

SectionMessage.displayName = 'SectionMessage';

export default SectionMessage;
export { MessageAction as SectionMessageAction };
