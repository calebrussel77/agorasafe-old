import {DialogHeading} from 'ariakit';
import clsx from 'clsx';
import React, {ReactElement, ReactNode, forwardRef} from 'react';

export interface HeaderOptions {
  className?: string;
  title?: string;
  subtitle?: string;
  iconBefore?: ReactElement;
  children?: ReactNode;
}

export type HeaderProps = HeaderOptions;

/**
 * @name Modal.Header
 */
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({children, className, title, subtitle, iconBefore, ...rest}, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'sticky top-0 w-full py-3 z-10 border-slate-100 bg-white border-b inset-x-0 md:relative',
          className
        )}
        {...rest}
      >
        <div className="flex w-full bg-white items-start gap-2 px-3">
          {iconBefore && iconBefore}
          <div>
            {title && (
              <DialogHeading className={clsx('text-xl', className)}>
                {title}
              </DialogHeading>
            )}
            {subtitle && <p className="mt-2">{subtitle}</p>}
          </div>
        </div>
        {children && <div className="w-full">{children}</div>}
      </div>
    );
  }
);

Header.displayName = 'Header';
