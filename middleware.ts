import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/notes') ||
    pathname.startsWith('/@modal/(.)notes');

  if (!token && isPrivateRoute) {
    const redirectUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (token && isAuthRoute) {
    const redirectUrl = new URL('/profile', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/@modal/(.)notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};