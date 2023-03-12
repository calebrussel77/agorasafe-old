import { ComponentProps, FC, ReactNode } from 'react';
import { HiOutlinePhoto, HiPhoto } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

type TImageEmptyProps = ComponentProps<'button'> & {
  className?: string;
  children?: ReactNode;
};
const ImageEmpty: FC<TImageEmptyProps> = ({ className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={twMerge(
        'border border-dashed border-gray-300 text-gray-600 rounded-md flex justify-center hover:bg-gray-100 py-16 px-14 transition duration-300',
        className
      )}
      {...rest}
    >
      {children ? children : <HiPhoto className="h-10 w-10 m-auto" />}
    </button>
  );
};

export default ImageEmpty;
