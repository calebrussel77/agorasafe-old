import clsx from 'clsx';
import React, {ReactNode, forwardRef} from 'react';

export interface FooterOptions {
  className?: string;
  children?: ReactNode;
}

export type FooterProps = FooterOptions;

/**
 * @name Dialog.Footer
 */
export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'sticky bottom-0 w-full bg-white inset-x-0 md:relative',
          className
        )}
        {...rest}
      >
        {children && (
          <div className="w-full py-3 px-3 border-t border-gray-200 ">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Footer.displayName = 'Footer';
