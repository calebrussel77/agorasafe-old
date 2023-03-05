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

type TInboxPageProps = NextPageWithLayout &
  FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const InboxPage: TInboxPageProps = ({ data }) => {
  return (
    <ContentWrapper>
      <ContentTitle>Messages</ContentTitle>
      <div className="mt-6">
        <p>
          Je suis mes messages. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sit sapiente.
        </p>
      </div>
    </ContentWrapper>
  );
};

InboxPage.getLayout = function getLayout(page: ReactElement) {
  const session: Session = page?.props?.data;
  const pageTitle = `Messages inbox - ${session?.user?.name}`;
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

export default InboxPage;
