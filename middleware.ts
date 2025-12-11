import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/notes') ||
    pathname.startsWith('/@modal/notes');

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/@modal/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};