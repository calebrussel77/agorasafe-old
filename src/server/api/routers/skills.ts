import { z } from 'zod';

import { getSkillsController } from '../controllers/skills-controller';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const skillsRouter = createTRPCRouter({
  getSkills: publicProcedure
    .input(
      z
        .object({
          name: z.string().length(0).nullish().optional(),
        })
        .nullish()
        .optional()
    )
    .query(({ input }) => getSkillsController(input?.name)),
});
