import { registerRouter, userRouter } from './routers';
import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  register: registerRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
