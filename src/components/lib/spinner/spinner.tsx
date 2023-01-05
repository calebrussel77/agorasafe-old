import clsx from 'clsx';
import React, {forwardRef} from 'react';

const Spinner = forwardRef<HTMLDivElement, {className?: string}>(
  ({className = 'w-9 h-9', ...rest}, ref) => {
    return <div ref={ref} {...rest} className={clsx('loader', className)} />;
  }
);

Spinner.displayName = 'Spinner';

function FullSpinner({className = 'w-9 h-9'}) {
  return (
    <div className="fixed inset-0 flex z-10 justify-center items-center">
      <div className={clsx('loader relative z-30', className)} />
    </div>
  );
}

const BtnSpinner = ({className = ''}) => (
  <svg
    className={clsx('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export {Spinner, FullSpinner, BtnSpinner};
