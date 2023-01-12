import {FC} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export {AppProviders};
