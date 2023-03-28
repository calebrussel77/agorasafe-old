import { cn } from '@helpers/misc';

const RowContainer = ({ className, ...props }) => {
  return (
    <div className={cn('flex flex-row items-center', className)} {...props} />
  );
};

export { RowContainer };
