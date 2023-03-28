import { Session } from 'next-auth';

import { getServerAuthSession } from '@server/auth';

type TRequireAuthProps = {
  ctx: any;
  redirectUrl?: string;
  cb: ({ session }: { session: Session }) => any;
};

export const requireAuth = async ({
  ctx,
  redirectUrl = '/login',
  cb,
}: TRequireAuthProps) => {
  const session = await getServerAuthSession(ctx);
  const redirect_url = ctx?.resolvedUrl;
  const destination = `${redirectUrl}?source=${redirect_url}`;

  if (!session) {
    return {
      redirect: {
        destination: destination,
        permanent: false,
      },
    };
  }

  return cb({ session } as any);
};
