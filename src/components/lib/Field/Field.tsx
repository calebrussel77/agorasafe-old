/* eslint-disable no-undef */
import clsx from 'clsx';
import { Fragment, forwardRef, useId } from 'react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { wrapChildren } from '@helpers/wrap-children';

import { HelperMessage } from '../helper-message/helper-message';
import { Label } from '../label/label';
import { RowContainer } from '../layout/row-container/row-container';
import { VariantMessage } from '../variant-message/variant-message';
import { getBaseType, getVariant } from './utils';

export interface FieldOptions {
  children: JSX.Element;
  disabled?: boolean;
  disabledIcon?: JSX.Element;
  label?: string | JSX.Element;
  required?: boolean;
  loading?: boolean;
  error?: string | JSX.Element;
  warning?: string | JSX.Element;
  success?: string | JSX.Element;
  info?: string | JSX.Element;
  hint?: string;
  className?: string;
}

export type FieldProps = FieldOptions;

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      disabled,
      disabledIcon,
      label,
      error: danger,
      warning,
      info,
      success,
      loading,
      required,
      hint,
      className,
    },
    ref
  ) => {
    const generatedId = useId();
    const form = useFormContext();
    const state = form?.getFieldState(children.props.name, form.formState);

    const baseType = getBaseType(
      children.props.type || children.type.displayName
    );
    const isCheckbox = baseType === 'checkbox';
    const isRadio = baseType === 'radio';

    const isCheckable = isRadio || isCheckbox;

    const layout = isCheckable ? 'flex-row' : 'flex-col';

    const Container = layout === 'flex-row' ? RowContainer : (Fragment as any);

    const htmlFor =
      children.props.id || children.props.name || `${baseType}--${generatedId}`;
    const hasHintText = !!hint;

    const infoText = info && wrapChildren(info);
    const errorText = danger && wrapChildren(danger);
    const warningText = warning && wrapChildren(warning);
    const successText = success && wrapChildren(success);

    const hasError = errorText || state?.error;
    const combinedErrorText = errorText || state?.error?.message;

    const hasVariantMessage =
      successText || warningText || combinedErrorText || infoText;

    const variant = getVariant({ danger, warning, success, info });

    const child = React.cloneElement(React.Children.only(children), {
      disabled,
      id: htmlFor,
      required,
      variant: hasError ? 'danger' : variant,
      loading,
    });

    return (
      <div ref={ref} className={twMerge('flex flex-col gap-0.5', className)}>
        <>
          <Container>
            {label && (
              <Label
                disabled={disabled}
                disabledIcon={disabledIcon}
                variant={hasError ? 'danger' : variant}
                htmlFor={htmlFor}
                required={required}
                withDisabledIcon={!isCheckable}
                className={clsx('font-semibold')}
              >
                {isCheckable && child}
                {label}
              </Label>
            )}
            {!isCheckable && child}
          </Container>

          {hasHintText && !hasVariantMessage && (
            <HelperMessage>{hint}</HelperMessage>
          )}

          {successText && (
            <VariantMessage variant="success">
              {successText as any}
            </VariantMessage>
          )}
          {hasError && (
            <VariantMessage variant="danger">
              {combinedErrorText as any}
            </VariantMessage>
          )}
          {infoText && (
            <VariantMessage variant="info">{infoText as any}</VariantMessage>
          )}
          {warningText && (
            <VariantMessage variant="warning">
              {warningText as any}
            </VariantMessage>
          )}
        </>
      </div>
    );
  }
);

Field.displayName = 'Field';
