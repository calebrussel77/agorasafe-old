import {FC} from 'react';

import {Footer} from './footer/footer';
import {Header} from './header/header';

const Layout: FC<any> = ({children}) => {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="mb-auto flex h-full flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export {Layout};
