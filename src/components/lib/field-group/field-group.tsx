import React, {forwardRef} from 'react';

import {Label, LabelOptions} from '../label/label';

export interface FieldGroupOptions {
  // specific to fieldset, we need to override children
  children: React.ReactNode;
  label?: string | React.ReactElement;
  dataTestId?: string;
  required?: LabelOptions['required'];
}

export type FieldGroupProps = React.HTMLProps<HTMLFieldSetElement> &
  FieldGroupOptions;

export const FieldGroup = forwardRef<HTMLFieldSetElement, FieldGroupProps>(
  ({children, dataTestId, label, required}, ref) => (
    <fieldset data-testid={dataTestId} ref={ref}>
      {label && <Label required={required}>{label}</Label>}
      {children}
    </fieldset>
  )
);

FieldGroup.displayName = 'FieldGroup';
