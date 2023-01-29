import {wrapChildren} from '@helpers/wrap-children';

const MiddleSeparator = ({children}) => {
  const content =
    typeof children === 'string'
      ? wrapChildren(children, 'bg-white px-2')
      : children;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">{content}</div>
    </div>
  );
};

export {MiddleSeparator};
