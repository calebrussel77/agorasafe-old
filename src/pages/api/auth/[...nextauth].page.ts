// Prisma adapter for NextAuth, optional and can be removed
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import NextAuth, {type NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import {env} from '../../../env/server.mjs';
import {prisma} from '../../../server/db';

export const authOptions: NextAuthOptions = {
  // Include user infos on session
  callbacks: {
    session({session, user}) {
      const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
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
    }),
  ],
};

export default NextAuth(authOptions);
