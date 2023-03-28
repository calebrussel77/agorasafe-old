import { ReactQueryOptions, RouterInputs, RouterOutputs } from '@utils/api';

export type TUserUpdateOutput = RouterOutputs['user']['updateUserInfos'];
export type TUserUpdateInput = RouterInputs['user']['updateUserInfos'];
export type TUserUpdateOptions = ReactQueryOptions['user']['updateUserInfos'];

export type TUserMeOptions = ReactQueryOptions['user']['getUserMe'];
export type TUserMeInput = RouterInputs['user']['getUserMe'];
export type TUserMeOutput = RouterOutputs['user']['getUserMe'];
