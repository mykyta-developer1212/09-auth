import { NextResponse, NextRequest } from 'next/server';
import { serverApi } from '@/lib/api/serverApi';

const authRoutes = ['/sign-in', '/sign-up'];
const privateRoutes = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!accessToken && refreshToken) {
    try {
      const response = await serverApi.checkSession(refreshToken);
      const res = NextResponse.next();

      if (response?.data?.accessToken) {
        res.cookies.set('accessToken', response.data.accessToken, { path: '/' });
      }
      if (response?.data?.refreshToken) {
        res.cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
      }

      if (isAuthRoute) return NextResponse.redirect(new URL('/', req.url));

      return res;
    } catch {
      if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};