/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import React, { ReactElement } from 'react';

import { AuthForm } from '@components/auth-form/auth-form';
import { HomeBackground } from '@components/home-background/home-background';
import { GoogleIconSolid } from '@components/icons/GoogleIconSolid';
import { LogoIcon } from '@components/icons/logo-icon/logo-icon';
import { Layout } from '@components/layouts/layouts';
import { Button } from '@components/lib/button/button';
import { MiddleSeparator } from '@components/lib/middle-separator/middle-separator';

import { redirectIfAuth } from '@utils/redirect-If-auth';

type TRegisterPageProps = {
  googleProvider: ClientSafeProvider;
};

const RegisterPage = ({ googleProvider }: TRegisterPageProps) => {
  return (
    <div className="isolate overflow-x-hidden">
      <HomeBackground />
      <div className="mx-auto w-full max-w-lg py-12 px-4">
        <div>
          <LogoIcon className="h-6 w-auto" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Inscription
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Gagnez de l'argent en proposant vos services et profitez des
            services offerts par d'autres prestataires.
          </p>
        </div>
        <div className="mt-8">
          <div>
            <div>
              <div className="mt-1">
                <Button
                  onClick={async () =>
                    await signIn(googleProvider.id, {
                      callbackUrl: `${window.location.origin}/dashboard`,
                      redirect: false,
                    })
                  }
                  className="w-full flex items-center justify-center"
                  variant="subtle"
                >
                  <GoogleIconSolid className="h-5 w-5" />
                  <span>Se connecter avec Google</span>
                </Button>
              </div>
            </div>
            <div className="mt-6 text-gray-500">
              <MiddleSeparator>Ou continuer avec</MiddleSeparator>
            </div>
          </div>

          <div className="mt-6">
            <AuthForm mode="register" />
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  const title = "S'inscrire";
  const description =
    "Inscrivez vous sur Agorasafe - Gagnez de l'argent en proposant vos services et profitez des services offerts par d'autres prestataires";
  return (
    <Layout title={title} description={description}>
      {page}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const providers = await getProviders();
  return redirectIfAuth({
    ctx,
    cb() {
      return {
        props: { googleProvider: providers.google || null },
      };
    },
  });
};

export default RegisterPage;
