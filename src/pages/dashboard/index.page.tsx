import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { FC } from 'react';
import { ReactElement } from 'react';

import { AuthLayout } from '@components/layouts/auth-layouts';

import { NextPageWithLayout } from '@pages/_app.page';

import { requireAuth } from '@utils/require-auth';

import { ContentTitle } from './__components/content-title/content-title';
import { ContentWrapper } from './__components/content-wrapper/content-wrapper';
import { Sidebar } from './__components/sidebar/sidebar';

type TDashboardPageProps = NextPageWithLayout &
  FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const DashboardPage: TDashboardPageProps = ({ data }) => {
  return (
    <ContentWrapper>
      <ContentTitle>Tableau de bord</ContentTitle>
      <div className="mt-3">
        <p>
          Je suis les settings. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sit sapiente.
        </p>
      </div>
    </ContentWrapper>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  const session: Session = page?.props?.data;
  const pageTitle = `Tableau de bord - ${session?.user?.name}`;
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

export default DashboardPage;
