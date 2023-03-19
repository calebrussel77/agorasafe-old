import { prisma } from '@server/db';

export async function getSkillsByArgs(name?: string) {
  const response = await prisma.skill.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  return response;
}
