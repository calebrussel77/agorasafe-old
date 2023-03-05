import { zodResolver } from '@hookform/resolvers/zod';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'>,
    VariantProps<typeof formToken> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const formToken = cva([''], {
  variants: {
    gap: {
      sm: ['space-y-3'],
      md: ['space-y-6'],
      lg: ['space-y-9'],
      xl: ['space-y-12'],
    },
  },
  compoundVariants: [{ gap: 'md' }],
  defaultVariants: {
    gap: 'md',
  },
});

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  gap,
  className,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      {/* <fieldset> passes the form's 'disabled' state to all of its elements,
            allowing us to handle disabled style variants with just css */}
      <fieldset
        disabled={form?.formState?.isSubmitting}
        className={formToken({
          gap,
          class: className,
        })}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
);

export default Form;

interface UseZodFormProps<S extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema?: S;
}

export const useZodForm = <S extends z.ZodSchema>({
  schema = null,
  ...formProps
}: UseZodFormProps<S>) =>
  useForm({
    ...formProps,
    resolver: schema ? zodResolver(schema) : undefined,
  });
