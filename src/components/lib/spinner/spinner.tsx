import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const SpinnerClasses = {
  default: 'border-l-white',
  primary: 'border-l-primary-500',
  secondary: 'border-l-secondary-500',
};

const Spinner = forwardRef<
  HTMLDivElement,
  { className?: string; variant?: 'default' | 'primary' | 'secondary' }
>(({ className = 'w-9 h-9', variant = 'default', ...rest }, ref) => {
  const classNameVariants = SpinnerClasses[variant];

  return (
    <div
      ref={ref}
      className={twMerge('loader', classNameVariants, className)}
    />
  );
});

Spinner.displayName = 'Spinner';

const FullSpinner = () => {
  return (
    <div className="fixed z-40 inset-0 h-full w-full flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm backdrop-filter transition-all duration-200 ease-in-out">
      <Spinner className="relative h-12 w-12 z-20" />
    </div>
  );
};

export { Spinner, FullSpinner };
