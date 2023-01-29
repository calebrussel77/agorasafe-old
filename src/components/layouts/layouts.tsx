import {NextSeo, NextSeoProps} from 'next-seo';
import {ReactNode} from 'react';

import {Footer} from './footer/footer';
import {Header} from './header/header';

type TLayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  noindex?: boolean;
};

const Layout = ({title, description, children, noindex}: TLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} noindex={noindex} />
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <main className="mb-auto flex h-full flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export {Layout};
