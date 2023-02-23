import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log({ req });
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/about-2', req.url));
    }
    console.log(req.nextauth);
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = { matcher: ['/dashboard'] };
