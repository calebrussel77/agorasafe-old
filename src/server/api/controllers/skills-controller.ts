import { TRPCError } from '@trpc/server';

import { getSkillsByArgs } from '../services/skill-service';

export const getSkillsController = async (name: string) => {
  try {
    const skills = await getSkillsByArgs(name);
    return {
      skills: skills,
      success: true,
    };
  } catch (e) {
    console.log(e, 'from trpc error skills');
    throw new TRPCError(e);
  }
};
