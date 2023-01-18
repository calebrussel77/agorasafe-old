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
import {ReactElement, ReactNode, forwardRef} from 'react';
import {twMerge} from 'tailwind-merge';

type MenuItemProps = {
  iconBefore?: ReactElement;
  iconAfter?: ReactElement;
  description?: string | ReactElement;
  hovered?: boolean;
  className?: string;
  position?: 'center' | 'top' | 'bottom';
  children?: ReactNode | JSX.Element;
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

const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps &
    React.HTMLProps<HTMLButtonElement> &
    React.ComponentPropsWithRef<'button'>
>(
  (
    {
      iconBefore = null,
      iconAfter = null,
      description = '',
      position = 'center',
      hovered = true,
      className = '',
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

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'w-full text-left flex justify-between rounded-md px-2 transition-all duration-200',
            hovered ? 'hover:bg-gray-100' : 'cursor-default',
            _position
          ),
          className
        )}
        {...props}
      >
        <div className={`flex w-full space-x-3 py-1 rounded-sm ${_position}`}>
          {iconBefore && <span className="flex-shrink-0">{iconBefore}</span>}
          <div className="space-y-1">
            {children && typeof children === 'string' ? (
              <h3 className="whitespace-nowrap">{children}</h3>
            ) : children ? (
              children
            ) : null}
            {description && typeof description === 'string' ? (
              <p className="text-sm line-clamp-2 text-gray-500 text-left">
                {description}
              </p>
            ) : description ? (
              description
            ) : null}
          </div>
        </div>
        {iconAfter && iconAfter}
      </button>
    );
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
            ? {overflowY: 'auto', flex: '1 1 0%', height: '100%'}
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
      style={{maxHeight: maxHeight && `${maxHeight}px`}}
      className={clsx('flex flex-col', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export {MenuItem, MenuGroup, HeadingItem, Section};
