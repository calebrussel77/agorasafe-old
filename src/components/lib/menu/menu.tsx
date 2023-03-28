/* eslint-disable no-undef */

/**
 * ---- usage ----
 <div className="bg-white border shadow-sm rounded-sm">
  <MenuGroup maxHeight={300}>
    <Section title="Articles" isScrollable>
      <MenuItem>Article #1</MenuItem>
      <MenuItem>Article #2</MenuItem>
      <MenuItem>Article #3</MenuItem>
      <MenuItem>Article #4</MenuItem>
      <MenuItem>Article #5</MenuItem>
      <MenuItem>Article #6</MenuItem>
      <MenuItem>Article #7</MenuItem>
      <MenuItem>Article #8</MenuItem>
      <MenuItem>Article #9</MenuItem>
      <MenuItem>Article #10</MenuItem>
      <MenuItem>Article #11</MenuItem>
      <MenuItem>Article #12</MenuItem>
    </Section>
    <Section aria-labelledby="actions" hasSeparator>
      <HeadingItem id="actions">Actions</HeadingItem>
      <MenuItem>Create article</MenuItem>
    </Section>
  </MenuGroup>
</div> 
 **/
import clsx from 'clsx';
import Link from 'next/link';
import { ReactElement, ReactNode, forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { cn } from '@helpers/misc';

type MenuItemProps = {
  iconBefore?: ReactElement;
  iconAfter?: ReactElement;
  description?: string | ReactElement;
  hovered?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  position?: 'center' | 'top' | 'bottom';
  children?: ReactNode | JSX.Element;
  loading?: boolean;
  isActive?: boolean;
};

type SectionProps = {
  title: string;
  className: string;
  children?: ReactNode | JSX.Element;
  hasSeparator: boolean;
  isScrollable: boolean;
};
type MenuGroupProps = {
  children?: ReactNode | JSX.Element;
  maxHeight?: number;
  className?: string;
};

type HeadingItemProps = {
  children?: ReactNode | JSX.Element;
  className?: string;
};

const HeadingItem = ({
  children,
  className = '',
  ...props
}: HeadingItemProps & React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h2 className={clsx('font-bold text-gray-600 px-4', className)} {...props}>
      {children}
    </h2>
  );
};

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      iconBefore = null,
      iconAfter = null,
      description = '',
      position = 'center',
      hovered = true,
      onClick,
      loading,
      isActive,
      className = '',
      href,
      children,
      ...props
    },
    ref
  ) => {
    const _position =
      position === 'bottom'
        ? 'items-end'
        : position === 'top'
        ? 'items-start'
        : 'items-center';

    const Item = (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          clsx(
            'w-full text-left flex justify-between rounded-md transition-all duration-200 overflow-hidden',
            hovered && !loading
              ? 'hover:bg-gray-100 px-2'
              : 'cursor-default px-0',
            _position
          ),
          isActive && !loading && 'bg-gray-100',
          className
        )}
        {...props}
      >
        <div className={`flex w-full space-x-3 py-2 rounded-sm ${_position}`}>
          {iconBefore && (
            <span className="flex-shrink-0">
              {loading ? <Skeleton className="h-8 w-8" circle /> : iconBefore}
            </span>
          )}
          <div className="">
            {children && typeof children === 'string' ? (
              <h3 className="whitespace-nowrap">
                {loading ? <Skeleton className="h-3 w-32" /> : children}
              </h3>
            ) : children ? (
              loading ? (
                <Skeleton className="h-3 w-32" />
              ) : (
                children
              )
            ) : null}
            {description && typeof description === 'string' ? (
              <p className="text-sm line-clamp-2 text-gray-500 text-left">
                {loading ? (
                  <Skeleton className="h-3 w-80" count={2} />
                ) : (
                  description
                )}
              </p>
            ) : description ? (
              loading ? (
                <Skeleton className="h-3 w-80" count={2} />
              ) : (
                description
              )
            ) : null}
          </div>
        </div>
        {iconAfter && loading ? (
          <Skeleton className="h-8 w-8" circle />
        ) : (
          iconAfter
        )}
      </button>
    );

    if (href) {
      return (
        <Link href={href} onClick={onClick} passHref>
          {Item}
        </Link>
      );
    }
    return Item;
  }
);

MenuItem.displayName = 'MenuItem';

const Section = ({
  title = '',
  className = '',
  children,
  hasSeparator = false,
  isScrollable = false,
  ...rest
}: SectionProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <>
      {hasSeparator && <hr className={clsx('bg-gray-100')} />}

      {title && (
        <HeadingItem className={clsx('pt-2 pb-0 text-center')}>
          {title}
        </HeadingItem>
      )}
      <section
        style={
          isScrollable
            ? { overflowY: 'auto', flex: '1 1 0%', height: '100%' }
            : {}
        }
        className={clsx('py-2 w-full scrollbar__custom', className)}
        {...rest}
      >
        {children}
      </section>
    </>
  );
};

const MenuGroup = ({
  children,
  maxHeight,
  className = '',
  ...rest
}: MenuGroupProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      style={{ maxHeight: maxHeight && `${maxHeight}px` }}
      className={clsx('flex flex-col', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export { MenuItem, MenuGroup, HeadingItem, Section };
