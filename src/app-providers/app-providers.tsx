import {FC} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {QueryClient, QueryClientProvider} from 'react-query';

import FullPageError from '@components/lib/full-page-error/full-page-error';

import {AuthProvider} from './auth/auth';

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

const AppProviders: FC<{children: React.ReactNode}> = ({children}) => {
  const queryClient = new QueryClient({
    defaultOptions: queryConfig,
  });

  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export {AppProviders};
