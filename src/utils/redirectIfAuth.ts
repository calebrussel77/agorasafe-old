import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type TRedirectIfAuthProps = {
  ctx: any;
  redirectUrl?: string;
  cb?: ({ session }: { session: Session }) => any;
};

export const redirectIfAuth = async ({
  ctx,
  redirectUrl = '/dashboard',
  cb = () => {},
}: TRedirectIfAuthProps) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }

  return cb({ session } as any);
};
