import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

import { Header } from './header/header';

type TAuthLayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  noindex?: boolean;
};

const AuthLayout = ({
  title,
  description,
  children,
  noindex,
}: TAuthLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} noindex={noindex} />
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <main className="mb-auto flex h-full flex-1 flex-col">{children}</main>
      </div>
    </>
  );
};

export { AuthLayout };
