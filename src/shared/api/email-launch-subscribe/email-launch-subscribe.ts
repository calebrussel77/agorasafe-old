import {useClient} from '@providers/auth/auth';
import {QueryClient, useMutation} from 'react-query';

const queryClient = new QueryClient();

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryClient.invalidateQueries('list-items'),
};

function useCreateListItem(options) {
  const client = useClient();

  return useMutation(
    fomdata =>
      client('https://app.convertkit.com/forms/3997673/subscriptions', {
        data: fomdata,
        method: 'POST',
      }),
    {
      ...defaultMutationOptions,
      ...options,
    }
  );
}
