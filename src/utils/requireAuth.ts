import {Session} from 'next-auth';
import {getSession} from 'next-auth/react';

type TRequireAuthProps = {
  ctx: any;
  redirectUrl?: string;
  cb: ({session}: {session: Session}) => any;
};

export const requireAuth = async ({
  ctx,
  redirectUrl = '/login',
  cb,
}: TRequireAuthProps) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }

  return cb({session} as any);
};
