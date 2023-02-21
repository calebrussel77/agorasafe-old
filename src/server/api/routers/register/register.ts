import {z} from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '../../trpc';
import {ZHelloInput} from './types';

export const registerRouter = createTRPCRouter({
  hello: publicProcedure.input(ZHelloInput).query(({input}) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  // getAll: publicProcedure.query(({ctx}) => {
  //   return ctx.prisma.example.findMany();
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
