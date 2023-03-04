import { z } from 'zod';

import Form, { useZodForm } from '@components/lib/form/form';

const schema = z.object({
  email: z.string().email(),
  // Numbers not between 10 & 20 will result in an error
  // being shown below the input thanks to FormField
  count: z.coerce.number().min(10).max(20),
  fruit: z.union([z.literal('apple'), z.literal('orange')]),
});

export default function PersonalInfosForm() {
  const form = useZodForm({
    schema,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <>
      <Form
        form={form}
        onSubmit={data => {
          console.log(data);

          // Adds some delay to demonstrate the form's disabled state
          return new Promise(res => setTimeout(res, 1000));
        }}
      >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Form>
    </>
  );
}


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
      {/* {loading && <FullSpinner />} */}

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
