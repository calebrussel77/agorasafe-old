import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { FC } from 'react';
import { ReactElement } from 'react';

import { AuthLayout } from '@components/layouts/auth-layouts';

import { NextPageWithLayout } from '@pages/_app.page';

import { requireAuth } from '@utils/require-auth';

import { ContentTitle } from '../__components/content-title/content-title';
import { ContentWrapper } from '../__components/content-wrapper/content-wrapper';
import { Sidebar } from '../__components/sidebar/sidebar';
import { PersonalInfosForm } from './__components/personal-infos-form/personal-infos-form';
import { ProfileInfosForm } from './__components/profile-infos-form/profile-infos-form';

type TSettingsPageProps = NextPageWithLayout &
  FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const SettingsPage: TSettingsPageProps = ({ data }) => {
  return (
    <ContentWrapper>
      <ContentTitle description="Configurer aisément vos différents réglagles liés à votre utilisation d'agorasafe ainsi que de vos données.  ">
        Paramètres
      </ContentTitle>

      <div className="mt-6 space-y-9">
        <PersonalInfosForm />
        <ProfileInfosForm />
      </div>
    </ContentWrapper>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  const session: Session = page?.props?.data;
  const pageTitle = `Settings - ${session?.user?.name}`;
  return (
    <AuthLayout title={pageTitle}>
      <Sidebar />
      {page}
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: Session;
}> = async ctx => {
  return requireAuth({
    ctx,
    cb({ session }) {
      return {
        props: { data: session },
      };
    },
  });
};

export default SettingsPage;
