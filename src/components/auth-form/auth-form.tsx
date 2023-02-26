import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import { Checkbox } from '@components/lib/checkbox/checkbox';
import { HelperMessage } from '@components/lib/helper-message/helper-message';
import { Input } from '@components/lib/input/input';
import { Label } from '@components/lib/label/label';
import { VariantMessage } from '@components/lib/variant-message/variant-message';

import { loginSchema, registerSchema } from '@validations/auth-user-schema';

import { TRegister } from '@interfaces/auth-user';

import { api } from '@utils/api';

type TAuthFormProps = {
  mode: 'register' | 'login';
};

type TAuthForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const AuthForm: FC<TAuthFormProps> = ({ mode }) => {
  const isLoginPage = mode === 'login';
  const router = useRouter();
  const authFormValidationSchema = isLoginPage ? loginSchema : registerSchema;
  const { mutate, isLoading } = api.register.authRegister.useMutation({
    onSuccess: data => {
      toast.success(data?.message, { autoClose: false, delay: 400 });
      router?.push(data?.redirect_url);
    },
    onError: (error, variables, context) => {
      toast.error(error?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormValidationSchema),
  });

  const onSignIn = async (data: TAuthForm) => {
    const { password, email } = data;
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    console.log(response);

    if (response?.error) {
      //next-auth add `Error:` prefix on error messages.
      const message = response?.error?.split(':')[1]?.trim();
      toast.error(message);
    }
    if (response?.ok) {
      toast.success('Nous sommes content de vous revoir !');
      router?.push('/dashboard');
    }
  };
  const onRegister = async (data: TAuthForm) => {
    await mutate({
      ...data,
    });
  };

  const onSubmit = async (data: TAuthForm) => {
    if (isLoginPage) {
      onSignIn(data);
    } else {
      onRegister(data);
    }
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
        error={
          (errors.password?.message || errors.confirmError?.message) as string
        }
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
                errors.confirmError?.message) as string
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
              variant={errors.desireError?.message ? 'danger' : undefined}
            >
              Je souhaite :
            </Label>
            <div className="flex items-center flex-wrap gap-2 justify-between">
              <Field label="Proposer mes services">
                <Checkbox {...register('isProvider', { value: true })} />
              </Field>
              <Field label="Demander des services">
                <Checkbox {...register('isCustomer', { value: true })} />
              </Field>
            </div>
            {errors.desireError?.message && (
              <VariantMessage variant="danger">
                {errors.desireError?.message as any}
              </VariantMessage>
            )}
          </div>
        </>
      )}
      <Button
        variant="primary"
        className="w-full"
        loading={isSubmitting || isLoading}
      >
        {!isLoginPage ? 'Inscription' : 'Connexion'}
      </Button>
      {!isLoginPage ? (
        <p>
          Déjà membre ?{' '}
          <Link
            passHref
            href="/login"
            className="font-semibold text-secondary-500 hover:underline"
          >
            Connectez-vous à votre compte
          </Link>
        </p>
      ) : (
        <p>
          Pas encore membre ?{' '}
          <Link
            passHref
            href="/register"
            className="font-semibold text-secondary-500 hover:underline"
          >
            Créez votre compte
          </Link>
        </p>
      )}

      {!isLoginPage && (
        <HelperMessage className="text-gray-500">
          En vous inscrivant vous acceptez les conditions générales et la
          politique de confidentialité
        </HelperMessage>
      )}

      <HelperMessage>
        Vos données personnelles (email et mot de passe) ne seront utilisées
        qu'à des fins d'authentification et ne seront pas partagées avec des
        tiers.
      </HelperMessage>
    </form>
  );
};

export { AuthForm };
