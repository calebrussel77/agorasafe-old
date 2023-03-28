import { signOut } from 'next-auth/react';

import { api } from '@utils/api';

import { ME_ERROR_MESSAGE } from '@constants/index';

import { TUserMeOptions, TUserUpdateInput, TUserUpdateOptions } from './types';

export const useUpdateUser = (options?: TUserUpdateOptions) => {
  const utils = api.useContext();
  const { mutate, ...rest } = api.user.updateUserInfos.useMutation({
    onSuccess(data, variables, ctx) {
      // invalidate all queries on the user router
      utils.user.getUserMe.invalidate();
      options?.onSuccess?.(data, variables, ctx);
    },
    ...options,
  });

  const updateUser = async (data: TUserUpdateInput) => {
    return await mutate({
      ...data,
    });
  };

  return { updateUser, ...rest };
};

export const useMe = (userSessionId: string, options?: TUserMeOptions) => {
  return api.user.getUserMe.useQuery(undefined, {
    onError(err) {
      console.error('me query error: ', err.message);
      // id exists but not valid session, clear it
      if (userSessionId && err.message === ME_ERROR_MESSAGE) {
        signOut({
          redirect: false,
          callbackUrl: '/',
        });
      }
    },
    ...options,
  });
};
