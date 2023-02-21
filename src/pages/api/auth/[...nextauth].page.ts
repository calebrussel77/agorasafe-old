// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db';

export const authOptions: NextAuthOptions = {
  // Include user infos on session
  callbacks: {
    session({ session, user }: any) {
      const currentUser = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        is_provider: user.is_provider,
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
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: uuidv4(),
          first_name: profile.given_name,
          last_name: profile.family_name,
          avatar: profile.picture,
          email: profile.email,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
