import { z } from 'zod';

import {
  personalInfosSchema,
  profilSchema,
} from '@validations/user-infos-schema';

export type TPersonalInfosSchema = z.infer<typeof personalInfosSchema>;

export type TProfilSchema = z.infer<typeof profilSchema>;

export type TUserInfosUpdate = Partial<TPersonalInfosSchema & TProfilSchema>;
