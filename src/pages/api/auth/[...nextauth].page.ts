// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

import { loginSchema } from '@validations/auth-user-schema';

import {
  createUniqueSlugByName,
  loginController,
} from '@server/api/controllers/auth-controller';
import { prisma } from '@server/db';

import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Include user infos on session
  callbacks: {
    async session({ session, token, user }: any) {
      let newSession;
      newSession = {
        id: token.id,
        name: token.name,
        email: token.email,
        slug: token.slug,
        is_provider: token.is_provider,
        is_purchaser: token.is_purchaser,
        is_home_service_provider: token.is_home_service_provider,
        avatar: token.avatar,
        provider: token.provider,
      };
      session.user = newSession;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
        token.name = `${user.first_name} ${user.last_name}`;
        token.email = user?.email;
        token.slug = user?.slug;
        token.is_provider = user?.is_provider;
        token.is_purchaser = user.is_purchaser;
        token.is_home_service_provider = user.is_home_service_provider;
        token.avatar = user.avatar;
        token.provider = account.type;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
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
      async authorize(credentials) {
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
  debug: env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: env.NEXTAUTH_JWT_SECRET,
  },
};

export default NextAuth(authOptions);
