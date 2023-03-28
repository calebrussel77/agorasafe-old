import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

import { cn } from '@helpers/misc';

import { FileType, getFileIcon, getFileName, getFileSize } from './utils/files';

export interface PreviewProps {
  file: FileType;
  onRemove: (file?: any) => void;
  className?: string;
}

export const Preview: React.FC<PreviewProps> = ({
  file,
  className,
  onRemove,
}) => {
  const Icon = getFileIcon(file);
  const name = getFileName(file);
  const size = getFileSize(file);

  return name ? (
    <div
      data-testid={name}
      className={cn(
        'flex gap-1 w-fit items-center text-gray-600 max-w-sm hover:bg-gray-100 transition duration-200 p-1.5 rounded-full cursor-pointer text-sm bg-white border border-gray-300 shadow',
        className
      )}
      onClick={onRemove}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="truncate">{name}</span>
      {size && (
        <span className="whitespace-nowrap text-secondary-500">({size})</span>
      )}
      <HiOutlineX className="ml-1 h-4 w-4 text-secondary-500 flex-shrink-0" />
    </div>
  ) : (
    <div />
  );
};
