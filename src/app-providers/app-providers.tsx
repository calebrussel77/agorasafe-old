import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import FullPageError from '@components/lib/full-page-error/full-page-error';

type TAppProviderProps = {
  children: React.ReactNode;
};

const AppProviders: FC<TAppProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>{children}</ErrorBoundary>
  );
};

export { AppProviders };
