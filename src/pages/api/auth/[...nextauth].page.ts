// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

import { loginSchema, registerSchema } from '@validations/auth-user-schema';

import {
  createUniqueSlugByName,
  loginController,
  registerController,
} from '@server/api/controllers/auth-controller';
import { prisma } from '@server/db';

import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user infos on session
  callbacks: {
    session({ session, user }: any) {
      const currentUser = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user?.email,
        slug: user?.slug,
        is_provider: user?.is_provider,
        is_purchaser: user.is_purchaser,
        is_home_service_provider: user.is_home_service_provider,
        avatar: user.avatar,
        provider: 'google',
      };
      session.user = currentUser;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const name = profile?.name;
        const uniqueSlug = await createUniqueSlugByName(name);
        return {
          id: uuidv4(),
          first_name: profile.given_name,
          last_name: profile.family_name,
          slug: uniqueSlug,
          avatar: profile.picture,
          email: profile?.email,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials, req) {
        const result: any = loginSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error(result.error.issues[0]?.message);
        }
        try {
          const user = await loginController(credentials);
          return user;
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default NextAuth(authOptions);
