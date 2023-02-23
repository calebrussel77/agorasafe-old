// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

import { loginSchema, registerSchema } from '@validations/auth-user-schema';

import { createUniqueSlugByName } from '@server/api/controllers/auth-controller';
import { prisma } from '@server/db';

import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user infos on session
  callbacks: {
    session({ session, user }: any) {
      const currentUser = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        slug: user.slug,
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
      async profile(profile) {
        try {
          const name = profile.name;
          const uniqueSlug = await createUniqueSlugByName(name);
          return {
            id: uuidv4(),
            first_name: profile.given_name,
            last_name: profile.family_name,
            slug: uniqueSlug,
            avatar: profile.picture,
            email: profile.email,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: 'Register',
      credentials: {
        firstName: { label: 'firstName', type: 'text' },
        lastName: { label: 'lastName', type: 'text' },
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
        isProvider: { label: 'IsProvider', type: 'checkbox' },
        isCustomer: { label: 'IsCustomer', type: 'checkbox' },
      },
      async authorize(credentials, req) {
        const result: any = registerSchema.safeParse(credentials);
        //Validation input
        if (!result.success) {
          throw new Error(result.error.issues[0]?.message);
        }

        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
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
        //Validation input
        if (!result.success) {
          throw new Error(result.error.issues[0]?.message);
        }

        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // pages: {
  //   signIn: '/login',
  //   signOut: '/login',
  //   error: '/login', // Error code passed in query string as ?error=
  //   verifyRequest: '/login', // (used for check email message)
  // },
};

export default NextAuth(authOptions);
