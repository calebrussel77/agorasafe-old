import { useRegister } from '@api-providers/auth-register';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-toastify';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import { Checkbox } from '@components/lib/checkbox/checkbox';
import Form, { useZodForm } from '@components/lib/form/form';
import { HelperMessage } from '@components/lib/helper-message/helper-message';
import { Input } from '@components/lib/input/input';
import { Label } from '@components/lib/label/label';
import { Notification } from '@components/lib/notification/notification';
import { VariantMessage } from '@components/lib/variant-message/variant-message';

import { registerSchema } from '@validations/auth-user-schema';

import { TRegister } from '@interfaces/auth-user';

type TRegisterForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const RegisterForm: FC<{ redirectUri?: string }> = ({ redirectUri }) => {
  const router = useRouter();

  const { register: authRegister, isLoading } = useRegister({
    onSuccess: data => {
      router?.push(redirectUri);
      toast(<Notification variant="success" title={data?.message} />, {
        autoClose: false,
        delay: 700,
      });
    },
    onError: error => {
      toast(<Notification variant="danger" title={error?.message} />);
    },
  });

  const form = useZodForm({
    schema: registerSchema,
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onRegister = async (data: TRegisterForm) => {
    await authRegister({
      ...data,
    });
  };

  const onSubmit = async (data: TRegisterForm) => {
    await onRegister(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-3">
        <Field required label="Nom">
          <Input
            {...register('firstName')}
            autoFocus={true}
            id="firstName"
            placeholder="Entrez votre nom"
          />
        </Field>
        <Field required label="Prénom">
          <Input
            {...register('lastName')}
            id="lastName"
            placeholder="Entrez votre prénom"
          />
        </Field>
      </div>

      <Field required label="Adresse email">
        <Input
          {...register('email')}
          type="email"
          placeholder="Entrez votre adresse email"
        />
      </Field>
      <Field
        required
        error={(errors as any)?.confirmError?.message}
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

      <Field
        required
        error={(errors as any)?.confirmError?.message}
        label="Confirmer le mot de passe"
      >
        <Input
          {...register('confirmPassword')}
          id="confirmPassword"
          shouldViewPasswordIcon
          type="password"
          placeholder="Confirmez votre mot de passe"
        />
      </Field>

      <div className="space-y-2">
        <Label
          required
          variant={(errors as any)?.desireError ? 'danger' : undefined}
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
        {(errors as any)?.desireError?.message && (
          <VariantMessage variant="danger">
            {(errors as any)?.desireError?.message}
          </VariantMessage>
        )}
      </div>

      <Button variant="primary" className="w-full" loading={isLoading}>
        Inscription
      </Button>

      <p>
        Déjà membre ?{' '}
        <Link
          passHref
          href={{
            pathname: '/login',
            query: router.query,
          }}
          className="font-semibold text-secondary-500 hover:underline"
        >
          Connectez-vous à votre compte
        </Link>
      </p>

      <HelperMessage className="text-gray-500">
        En vous inscrivant vous acceptez les conditions générales et la
        politique de confidentialité
      </HelperMessage>

      <HelperMessage>
        Vos données personnelles (email et mot de passe) ne seront utilisées
        qu'à des fins d'authentification et ne seront pas partagées avec des
        tiers.
      </HelperMessage>
    </Form>
  );
};

export { RegisterForm };
