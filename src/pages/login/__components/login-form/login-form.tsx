import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import Form, { useZodForm } from '@components/lib/form/form';
import { HelperMessage } from '@components/lib/helper-message/helper-message';
import { Input } from '@components/lib/input/input';
import { Notification } from '@components/lib/notification/notification';
import { FullSpinner } from '@components/lib/spinner/spinner';

import { loginSchema } from '@validations/auth-user-schema';

import { TRegister } from '@interfaces/auth-user';

type TLoginForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useZodForm({
    schema: loginSchema,
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSignIn = async (data: TLoginForm) => {
    const { password, email } = data;
    setLoading(true);
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });
    if (response?.error) {
      //next-auth add `Error:` prefix on error messages.
      const message = response?.error?.split(':')[1]?.trim();
      toast(<Notification variant="danger" title={message} />);
      setLoading(false);
    }
    if (response?.ok) {
      router?.push('/dashboard');
      setLoading(false);
      toast(
        <Notification
          variant="success"
          title="Nous sommes content de vous revoir !"
        />,
        {
          delay: 800,
          autoClose: false,
        }
      );
    }
  };

  const onSubmit = async (data: TLoginForm) => {
    onSignIn(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      {loading && <FullSpinner />}

      <Field required label="Adresse email">
        <Input
          {...register('email')}
          autoFocus={true}
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

      <Button variant="primary" className="w-full" loading={isSubmitting}>
        Connexion
      </Button>

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

      <HelperMessage>
        Vos données personnelles (email et mot de passe) ne seront utilisées
        qu'à des fins d'authentification et ne seront pas partagées avec des
        tiers.
      </HelperMessage>
    </Form>
  );
};

export { LoginForm };
