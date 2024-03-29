import clsx from 'clsx';
import React from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

export const CloseButton: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <button
      title="Close"
      className={clsx(
        'p-1 rounded-full bg-gray-50 text-gray-600 hover:text-gray-900 flex justify-center fixed md:absolute top-3 right-3 z-20 items-center',
        className
      )}
      {...props}
    >
      <HiOutlineXMark className="h-5 w-5" />
    </button>
  );
};
