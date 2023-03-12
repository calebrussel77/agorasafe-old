import { forwardRef, useEffect } from 'react';
import StateManagedSelect from 'react-select';
import ReactSelect from 'react-select';

import { Variant } from '@helpers/variants';

import { defaultComponents } from '../_components';
import { defaultStyles, defaultTheme } from '../_components/styles';

/**
 * For React-hooks-form => handle required state
 * 
 *  <Controller
        name="select"
        control={control}
        render={({ field }) => <SelectUI 
          {...field} 
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]} 
        />}
/>
 */

type SelectProps = React.ComponentProps<StateManagedSelect> & {
  setParentValue?: any;
  variant?: Variant;
  isLoading?: boolean;
};

const SelectUI = forwardRef<any, SelectProps>(
  (
    {
      styles,
      value,
      components,
      onChange,
      defaultValue,
      variant,
      setParentValue,
      ...rest
    },
    ref
  ) => {
    const handleOnchange = (el, actionMeta) => {
      setParentValue && setParentValue(el);
      onChange(el, actionMeta);
    };

    useEffect(() => {
      if (defaultValue) {
        setParentValue && setParentValue(defaultValue);
      }
    }, [defaultValue, setParentValue]);

    return (
      <ReactSelect
        ref={ref}
        {...rest}
        value={value}
        onChange={handleOnchange}
        aria-invalid={variant === 'danger' ? 'true' : 'false'}
        components={{
          ...defaultComponents,
          ...components,
        }}
        styles={{ ...defaultStyles(variant), ...styles }}
        theme={defaultTheme}
        isClearable
        classNamePrefix="agorasafe__select"
      />
    );
  }
);

SelectUI.displayName = 'SelectUI';

export default SelectUI;
