import { Prisma } from '@prisma/client';

import { prisma } from '@server/db';

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      skills: true,
      show_case_photos: true,
    },
  });
}

export async function getUserBySlug(slug: string) {
  return await prisma.user.findUnique({ where: { slug } });
}

export async function createUser(createArgs: Prisma.UserCreateArgs) {
  return await prisma.user.create(createArgs);
}

export async function updateUser(updateArgs: Prisma.UserUpdateArgs) {
  return await prisma.user.update(updateArgs);
}
