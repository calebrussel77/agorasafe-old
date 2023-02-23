import React, { forwardRef } from 'react';

import { FieldGroup } from '../field-group/field-group';
import { Radio, RadioProps } from '../radio/radio';

export interface RadioGroupOptions {
  name?: string;
  flexDirection?: string;
  options?: {
    label: string | number;
    value: string | number;
    hint?: string;
  }[];
  renderOption?: React.ElementType;
  value?: string;
}
export type RadioGroupProps = React.HTMLProps<HTMLInputElement> &
  RadioGroupOptions &
  RadioProps;

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      flexDirection,
      label,
      name,
      options = [],
      maxWidth,
      renderOption: Component = Radio,
      required,
      value,
      ...rest
    },
    ref
  ) => {
    const wrappperClassName =
      flexDirection === 'column'
        ? 'flex flex-col gap-4'
        : 'flex flex-row gap-4';

    return (
      <FieldGroup label={label} required={required}>
        <div className={wrappperClassName}>
          {options.map(option => (
            <Component
              ref={ref}
              // checked={option.value === value}
              hint={option.hint}
              id={`${name}.${option.value}`}
              key={option.value}
              label={option.label}
              name={name}
              type="radio"
              value={option.value}
              maxWidth={maxWidth}
              {...rest}
            />
          ))}
        </div>
      </FieldGroup>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
