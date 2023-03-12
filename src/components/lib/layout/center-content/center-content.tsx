import { twMerge } from 'tailwind-merge';

const CenterContent = ({ className = '', ...props }) => {
  return (
    <div
      className={twMerge(
        'h-full flex-1 w-full flex flex-col items-center justify-center p-6',
        className
      )}
      {...props}
    />
  );
};

export { CenterContent };
