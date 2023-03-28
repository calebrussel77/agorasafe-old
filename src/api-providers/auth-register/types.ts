import { ReactQueryOptions, RouterInputs, RouterOutputs } from '@utils/api';

export type TAuthRegisterOutput = RouterOutputs['register']['authRegister'];
export type TAuthRegisterInput = RouterInputs['register']['authRegister'];
export type TAuthRegisterOptions =
  ReactQueryOptions['register']['authRegister'];
