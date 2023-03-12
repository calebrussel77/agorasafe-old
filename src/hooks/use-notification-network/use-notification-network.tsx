import { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNetworkState } from 'react-use';

type TUseNotificationNetworkProps = {
  activeNetworkNotification: ReactElement;
  failedNetworkNotification: ReactElement;
};

const useNotificationNetwork = ({
  activeNetworkNotification,
  failedNetworkNotification,
}) => {
  const state = useNetworkState();

  useEffect(() => {
    if (state?.online && state.previous === false) {
      toast(activeNetworkNotification, { autoClose: false });
    }
    if (state.previous && state?.online === false) {
      toast(failedNetworkNotification, { autoClose: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.online, state.previous]);
};

export { useNotificationNetwork };
