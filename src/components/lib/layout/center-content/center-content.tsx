import { cn } from '@helpers/misc';

const CenterContent = ({ className = '', ...props }) => {
  return (
    <div
      className={cn(
        'h-full flex-1 w-full flex flex-col items-center justify-center p-6',
        className
      )}
      {...props}
    />
  );
};

export { CenterContent };
