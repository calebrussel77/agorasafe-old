import {type DefaultSession} from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      avatar: string;
      provider: string;
      is_provider: boolean;
      is_purchaser: boolean;
      is_home_service_provider: boolean;
    };
  }
}
