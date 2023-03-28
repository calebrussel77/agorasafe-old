/* eslint-disable no-undef */
// import {ChevronDownIcon} from '@heroicons/react/outline';
import { ReactElement } from 'react';
import { HiChevronDown, HiX } from 'react-icons/hi';
import { GroupBase, components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { SelectComponents } from 'react-select/dist/declarations/src/components';

import { Spinner } from '@components/lib/spinner/spinner';

import { cn } from '@helpers/misc';

const DefaultLoadingIndicator = props => {
  return <Spinner className="h-5 w-5" variant="primary" {...props} />;
};

const DefaultClearIndicator = props => {
  return (
    <components.ClearIndicator {...props} className={cn('!p-0')}>
      <span className="p-0.5 rounded-full bg-gray-500 bg-opacity-40 text-white hover:bg-opacity-70 cursor-pointer transition duration-200">
        <HiX className="h-3 w-3" />
      </span>
    </components.ClearIndicator>
  );
};

const DefaultDropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props} className={cn('!p-0 !mr-2')}>
      <span className="text-slate-500 hover:text-slate-600 transition duration-200">
        <HiChevronDown className="h-4 w-4" />
      </span>
    </components.DropdownIndicator>
  );
};

const DefaultIndicatorsContainer = props => {
  return (
    <components.IndicatorsContainer {...props}>
      <div className="flex flex-shrink-0 items-center space-x-2">
        {props.children}
      </div>
    </components.IndicatorsContainer>
  );
};

const DefaultMultiValueLabel = (props): ReactElement => {
  return (
    <components.MultiValueLabel {...props}>
      {typeof props.children !== 'string' ? props?.data?.label : props.children}
    </components.MultiValueLabel>
  );
};

const DefaultSingleValue = (props): ReactElement => {
  return (
    <components.SingleValue {...props}>
      {typeof props.children !== 'string' ? props?.data?.label : props.children}
    </components.SingleValue>
  );
};

const DefaultMenuList = (props): ReactElement => {
  return (
    <components.MenuList className="scrollbar__custom" {...props}>
      {props.children}
    </components.MenuList>
  );
};

const DefaultNoOptionsMessage = (props): ReactElement => {
  return (
    <components.NoOptionsMessage className="font-bold" {...props}>
      {props.children}
    </components.NoOptionsMessage>
  );
};

const animatedComponents = makeAnimated();

export const defaultComponents: Partial<
  SelectComponents<unknown, boolean, GroupBase<unknown>>
> = {
  ...animatedComponents,
  LoadingIndicator: DefaultLoadingIndicator,
  IndicatorSeparator: null,
  ClearIndicator: DefaultClearIndicator,
  DropdownIndicator: DefaultDropdownIndicator,
  IndicatorsContainer: DefaultIndicatorsContainer,
  MultiValueLabel: DefaultMultiValueLabel,
  MenuList: DefaultMenuList,
  NoOptionsMessage: DefaultNoOptionsMessage,
  /**
   * // need to be fixe, have some little isssues.
   * SingleValue: DefaultSingleValue,
   **/
};
