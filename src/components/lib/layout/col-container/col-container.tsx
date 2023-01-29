import {twMerge} from 'tailwind-merge';

const ColContainer = ({className, ...props}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-start gap-1',
        className
      )}
      {...props}
    />
  );
};

export {ColContainer};
