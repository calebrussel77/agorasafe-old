import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Field} from '@components/lib/Field/Field';
import {Input} from '@components/lib/input/input';

import {
  SubscriptionSchema,
  TSubscriptionForm,
} from './form-subscription.validation';

const FormSubscription = ({onSubmit, formRef}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TSubscriptionForm>({
    resolver: zodResolver(SubscriptionSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-6">
      <Field
        required
        error={errors.name?.message as string}
        aria-label="Nom"
        label="Nom"
      >
        <Input autoFocus placeholder="Entrez votre nom" {...register('name')} />
      </Field>
      <Field
        required
        error={errors.email?.message as string}
        aria-label="Adresse email"
        label="Adresse email"
      >
        <Input
          placeholder="Entrez votre adresse email"
          {...register('email')}
        />
      </Field>
    </form>
  );
};

export {FormSubscription};
