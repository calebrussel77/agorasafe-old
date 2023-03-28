import {
  personalInfosSchema,
  profilSchema,
} from '@validations/user-infos-schema';

import { getUserMeController, updateUserInfosController } from '../controllers';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  updateUserInfos: protectedProcedure
    .input(personalInfosSchema.merge(profilSchema).optional())
    .mutation(({ input, ctx }) =>
      updateUserInfosController(input, ctx?.session)
    ),
  getUserMe: protectedProcedure.query(({ ctx }) =>
    getUserMeController(ctx?.session?.user?.id)
  ),
});
