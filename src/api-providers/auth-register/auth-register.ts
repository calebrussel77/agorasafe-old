import { api } from '@utils/api';

import { TAuthRegisterInput, TAuthRegisterOptions } from './types';

export const useRegister = (options?: TAuthRegisterOptions) => {
  const { mutate, ...rest } = api.register.authRegister.useMutation({
    onError(error, variables, ctx) {
      console.error(error);
      options?.onError?.(error, variables, ctx);
    },
    ...options,
  });

  const register = async (data: TAuthRegisterInput) => {
    return await mutate({
      ...data,
    });
  };

  return { register, ...rest };
};
