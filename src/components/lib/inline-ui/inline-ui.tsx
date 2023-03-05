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

/**
 *  
 *  char   description          unicode   html       html entity    utf-8

    ·      Middle Dot           U+00B7    &#183;     &middot;       C2 B7
    ·      Greek Ano Teleia     U+0387    &#903;                    CE 87
    •      Bullet               U+2022    &#8226;    &bull;         E2 80 A2
    ‧      Hyphenation Point    U+2027    &#8321;                   E2 80 A7
    ∙      Bullet Operator      U+2219    &#8729;                   E2 88 99
    •      Bullet               U+2022    &#8226;    &bull;         E2 80 A2
    ●      Black Circle         U+25CF    &#9679;                   E2 97 8F
    ⬤     Black Large Circle   U+2B24    &#11044;                  E2 AC A4
* 
*/

type InlineUIProps = {
  divider?: string | ReactElement<any>;
  className?: string;
  children?: ReactNode;
};
const InlineUI = forwardRef<HTMLDivElement, InlineUIProps>(
  (
    {
      divider = (
        <span aria-hidden="true" className="text-gray-500">
          ∙
        </span>
      ),
      className,
      children,
    },
    ref
  ) => {
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
