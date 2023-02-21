import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Session} from 'next-auth';
import {FC} from 'react';
import {ReactElement} from 'react';

import {AuthLayout} from '@components/layouts/auth-layouts';

import {NextPageWithLayout} from '@pages/_app.page';

import {requireAuth} from '@utils/requireAuth';

import {ContentTitle} from '../__components/content-title/content-title';
import {ContentWrapper} from '../__components/content-wrapper/content-wrapper';
import {Sidebar} from '../__components/sidebar/sidebar';

type TNotificationsPageProps = NextPageWithLayout &
  FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const NotificationsPage: TNotificationsPageProps = ({data}) => {
  return (
    <ContentWrapper>
      <ContentTitle>Settings</ContentTitle>
      <div className="mt-3">
        <p>
          Je suis les settings. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sit sapiente.
        </p>
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
    cb({session}) {
      return {
        props: {data: session},
      };
    },
  });
};

export default NotificationsPage;
