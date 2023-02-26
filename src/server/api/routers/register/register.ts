import { registerSchema } from '@validations/auth-user-schema';

import { registerController } from '@server/api/controllers';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const registerRouter = createTRPCRouter({
  authRegister: publicProcedure
    .input(registerSchema)
    .mutation(({ input }) => registerController(input)),
});
