import { User } from '@prisma/client';

import { prisma } from '@server/db';

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserBySlug(slug: string) {
  return await prisma.user.findUnique({ where: { slug } });
}

export async function createUser(
  userInfos: Omit<Partial<User>, 'slug' | 'first_name' | 'last_name'> & {
    slug: string;
    first_name: string;
    last_name: string;
  }
) {
  return await prisma.user.create({
    data: {
      ...userInfos,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      avatar: true,
      is_home_service_provider: true,
      is_provider: true,
      is_purchaser: true,
      slug: true,
    },
  });
}
