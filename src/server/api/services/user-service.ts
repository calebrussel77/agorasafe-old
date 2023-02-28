import { Prisma } from '@prisma/client';

import { prisma } from '@server/db';

// Exclude keys from user
export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserBySlug(slug: string) {
  return await prisma.user.findUnique({ where: { slug } });
}

export async function createUser(createArgs: Prisma.UserCreateArgs) {
  return await prisma.user.create(createArgs);
}
