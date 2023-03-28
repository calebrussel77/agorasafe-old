import { ComponentProps, FC, ReactElement, ReactNode } from 'react';

import { cn } from '@helpers/misc';

type TImageEmptyProps = ComponentProps<'div'> & {
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
  bgElement?: ReactElement;
  viewActionMode?: 'now' | 'hover';
};

const ActionOnTop: FC<TImageEmptyProps> = ({
  className,
  bgElement,
  children,
  viewActionMode = 'hover',
  ...rest
}) => {
  const isHoverMode = viewActionMode === 'hover';

  return (
    <div
      className={cn(
        'relative w-fit h-fit group overflow-hidden transition duration-300',
        className
      )}
      {...rest}
    >
      {bgElement}
      <div
        className={cn(
          'absolute z-10 inset-0 flex justify-center items-center bg-opacity-60 bg-gray-800',
          isHoverMode ? 'lg:opacity-0 lg:group-hover:opacity-100' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { ActionOnTop };
