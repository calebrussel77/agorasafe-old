import { User } from '@prisma/client';

import { prisma } from '@server/db';

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserBySlug(slug: string) {
  return await prisma.user.findUnique({ where: { slug } });
}

export async function createUser(userInfos: any) {
  return await prisma.user.create({
    data: {
      ...userInfos,
    },
  });
}
