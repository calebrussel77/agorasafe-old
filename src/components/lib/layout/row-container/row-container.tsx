import { twMerge } from 'tailwind-merge';

const RowContainer = ({ className, ...props }) => {
  return (
    <div
      className={twMerge('flex flex-row items-center', className)}
      {...props}
    />
  );
};

export { RowContainer };
