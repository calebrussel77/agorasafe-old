import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '@validations/schema/login-schema';
import {
  registerSchema,
  registerSchemaValidation,
} from '@validations/schema/register-schema';
import {signIn, signOut, useSession} from 'next-auth/react';
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

type TAuthFormProps = {
  mode: 'register' | 'login';
};

type TAuthForm = z.infer<typeof registerSchema> & {
  confirm?: any;
  desire?: any;
};

const AuthForm: FC<TAuthFormProps> = ({mode}) => {
  const isLoginPage = mode === 'login';
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TAuthForm>({
    resolver: zodResolver(isLoginPage ? loginSchema : registerSchemaValidation),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {!isLoginPage && (
        <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-3">
          <Field
            {...register('firstName')}
            requiredLabel
            error={errors.firstName?.message as string}
            autoFocus={!isLoginPage}
            id="firstName"
            label="Nom"
          >
            <Input placeholder="Entrez votre nom" />
          </Field>
          <Field
            requiredLabel
            {...register('lastName')}
            error={errors.lastName?.message as string}
            id="lastName"
            label="Prénom"
          >
            <Input placeholder="Entrez votre prénom" />
          </Field>
        </div>
      )}
      <Field
        requiredLabel
        {...register('email')}
        error={errors.email?.message as string}
        id="email"
        autoFocus={isLoginPage}
        label="Adresse email"
      >
        <Input type="email" placeholder="Entrez votre adresse email" />
      </Field>
      <Field
        {...register('password')}
        requiredLabel
        viewPasswordIcon
        error={(errors.password?.message || errors.confirm?.message) as string}
        id="password"
        label="Mot de passe"
      >
        <Input type="password" placeholder="Entrez votre mot de passe" />
      </Field>
      {!isLoginPage && (
        <>
          <Field
            {...register('confirm_password')}
            requiredLabel
            viewPasswordIcon
            error={
              (errors.confirm_password?.message ||
                errors.confirm?.message) as string
            }
            id="confirm_password"
            label="Confirmer le mot de passe"
          >
            <Input type="password" placeholder="Confirmez votre mot de passe" />
          </Field>
          <div className="space-y-2">
            <Label required>Je souhaite : </Label>
            <div className="flex items-center flex-wrap gap-2 justify-between">
              <Field
                {...register('isProvider', {value: true})}
                label="Proposer mes services"
              >
                <Checkbox />
              </Field>
              <Field
                {...register('isCustomer', {value: true})}
                label="Demander des services"
              >
                <Checkbox />
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
      <Button variant="primary" className="w-full">
        Connexion
      </Button>
      {!isLoginPage && (
        <HelperMessage className="text-sm text-gray-500">
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
