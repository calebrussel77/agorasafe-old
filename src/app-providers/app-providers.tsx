import {FC} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import FullPageError from '@components/lib/full-page-error/full-page-error';

const AppProviders: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>{children}</ErrorBoundary>
  );
};

export {AppProviders};
