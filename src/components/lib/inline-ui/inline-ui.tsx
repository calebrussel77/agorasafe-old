import clsx from 'clsx';
import { Children, Fragment, ReactElement, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Example
 *  <InlineUI
      divider={<span className="text-blue-600">·</span>}
      divider={<span aria-hidden="true">&middot;</span>}
      className="gap-1"
    >
      {actions}
    </InlineUI>
 */

type InlineUIProps = {
  divider?: string | ReactElement<any>;
  className?: string;
  children?: ReactNode;
};
const InlineUI = forwardRef<HTMLDivElement, InlineUIProps>(
  ({ divider, className, children }, ref) => {
    const dividerComponent =
      typeof divider === 'string' ? <span>{divider}</span> : divider;

    return (
      <div className={twMerge(clsx('flex items-center'), className)} ref={ref}>
        {Children.map(children, (child, index) => {
          return (
            <Fragment>
              {divider && index > 0 ? dividerComponent : null}
              <span className="line-clamp-1 whitespace-nowrap flex-nowrap">
                {child}
              </span>
            </Fragment>
          );
        })}
      </div>
    );
  }
);

InlineUI.displayName = 'InlineUI';

export { InlineUI };
