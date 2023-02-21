import {zodResolver} from '@hookform/resolvers/zod';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Field} from '@components/lib/Field/Field';
import {Button} from '@components/lib/button/button';
import {Checkbox} from '@components/lib/checkbox/checkbox';
import {HelperMessage} from '@components/lib/helper-message/helper-message';
import {Input} from '@components/lib/input/input';
import {Label} from '@components/lib/label/label';
import {VariantMessage} from '@components/lib/variant-message/variant-message';

import {
  loginSchema,
  registerSchema,
  registerSchemaValidation,
} from './auth-form.validation';

type TAuthFormProps = {
  mode: 'register' | 'login';
};

type TAuthForm = z.infer<typeof registerSchema> & {
  confirm?: any;
  desire?: any;
};

const AuthForm: FC<TAuthFormProps> = ({mode}) => {
  const isLoginPage = mode === 'login';
  const authFormValidationSchema = isLoginPage
    ? loginSchema
    : registerSchemaValidation;

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormValidationSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {!isLoginPage && (
        <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-3">
          <Field
            required
            error={errors.firstName?.message as string}
            label="Nom"
          >
            <Input
              {...register('firstName')}
              autoFocus={!isLoginPage}
              id="firstName"
              placeholder="Entrez votre nom"
            />
          </Field>
          <Field
            required
            error={errors.lastName?.message as string}
            label="Prénom"
          >
            <Input
              {...register('lastName')}
              id="lastName"
              placeholder="Entrez votre prénom"
            />
          </Field>
        </div>
      )}
      <Field
        required
        error={errors.email?.message as string}
        label="Adresse email"
      >
        <Input
          {...register('email')}
          autoFocus={isLoginPage}
          type="email"
          placeholder="Entrez votre adresse email"
        />
      </Field>
      <Field
        required
        error={(errors.password?.message || errors.confirm?.message) as string}
        label="Mot de passe"
      >
        <Input
          {...register('password')}
          shouldViewPasswordIcon
          id="password"
          type="password"
          placeholder="Entrez votre mot de passe"
        />
      </Field>
      {!isLoginPage && (
        <>
          <Field
            required
            error={
              (errors.confirm_password?.message ||
                errors.confirm?.message) as string
            }
            label="Confirmer le mot de passe"
          >
            <Input
              {...register('confirm_password')}
              id="confirm_password"
              shouldViewPasswordIcon
              type="password"
              placeholder="Confirmez votre mot de passe"
            />
          </Field>
          <div className="space-y-2">
            <Label
              required
              variant={errors.desire?.message ? 'danger' : undefined}
            >
              Je souhaite :
            </Label>
            <div className="flex items-center flex-wrap gap-2 justify-between">
              <Field label="Proposer mes services">
                <Checkbox {...register('isProvider', {value: true})} />
              </Field>
              <Field label="Demander des services">
                <Checkbox {...register('isCustomer', {value: true})} />
              </Field>
            </div>
            {errors.desire?.message && (
              <VariantMessage variant="danger">
                {errors.desire?.message as any}
              </VariantMessage>
            )}
          </div>
        </>
      )}
      <Button variant="primary" className="w-full" loading={isSubmitting}>
        Connexion
      </Button>

      {!isLoginPage && (
        <HelperMessage className="text-gray-500">
          En vous inscrivant vous acceptez les conditions générales et la
          politique de confidentialité
        </HelperMessage>
      )}
      <HelperMessage>
        Vos données personnelles (email et nom d'utilisateur) ne sont utilisées
        qu'à des fins d'authentification et ne sont pas partagées avec des
        tiers.
      </HelperMessage>
    </form>
  );
};

export {AuthForm};
