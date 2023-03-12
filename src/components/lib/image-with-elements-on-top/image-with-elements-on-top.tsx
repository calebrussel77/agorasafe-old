import { ComponentProps, FC, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { ImageUI, ImageUIOptions } from '../image-ui/image-ui';

type TImageEmptyProps = ComponentProps<'div'> &
  ImageUIOptions & {
    className?: string;
    imageClassName?: string;
    children?: ReactNode;
  };

const ImageWithElementsOnTop: FC<TImageEmptyProps> = ({
  className,
  src,
  name,
  shape,
  position,
  imageClassName,
  children,
  ...rest
}) => {
  return (
    <div
      className={twMerge(
        'relative group w-full overflow-hidden border border-dashed border-gray-300 rounded-md transition duration-300',
        className
      )}
      {...rest}
    >
      <ImageUI
        className={imageClassName}
        src={src}
        position={position}
        shape={shape}
        name={name}
      />
      <div className="absolute z-10 inset-0 flex justify-center items-center lg:opacity-0 lg:group-hover:opacity-100 bg-opacity-70 bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default ImageWithElementsOnTop;
