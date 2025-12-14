import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serverApi } from '@/lib/api/serverApi';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let isAuthenticated = Boolean(accessToken);

  if (!accessToken && refreshToken) {
    const res = await serverApi.checkSession();

    if (res.data) {
      isAuthenticated = true;

      const response = NextResponse.next();

      const setCookie = res.headers['set-cookie'];
      if (setCookie) {
        setCookie.forEach(cookie => {
          response.headers.append('Set-Cookie', cookie);
        });
      }

      return response;
    }

    isAuthenticated = false;
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};