import { cn } from '@helpers/misc';

const ColContainer = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-start gap-1',
        className
      )}
      {...props}
    />
  );
};

export { ColContainer };
