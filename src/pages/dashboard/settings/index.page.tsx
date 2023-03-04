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
import UpdateInfos from './__components/personal-infos-form/personal-infos-form';

type TNotificationsPageProps = NextPageWithLayout &
  FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const NotificationsPage: TNotificationsPageProps = ({ data }) => {
  return (
    <ContentWrapper>
      <ContentTitle
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nesciunt
      reprehenderit placeat cupiditate earum neque aliquid exercitationem
      recusandae? Quae maiores laboriosam, impedit ullam quidem unde animi sequi
      voluptates sapiente optio."
      >
        Paramètres
      </ContentTitle>

      <div className="mt-6">
        <UpdateInfos />
      </div>
    </ContentWrapper>
  );
};

NotificationsPage.getLayout = function getLayout(page: ReactElement) {
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

export default NotificationsPage;
