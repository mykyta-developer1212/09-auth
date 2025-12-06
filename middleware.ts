import { NextResponse, NextRequest } from 'next/server';
import { serverApi } from '@/lib/api/serverApi';

const authRoutes = ['/sign-in', '/sign-up'];
const privateRoutes = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  const token = req.cookies.get('token')?.value;

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (token) {
    try {
      const response = await serverApi.checkSession(token);
      const res = NextResponse.next();

      if (response?.data?.newToken) {
        res.cookies.set('token', response.data.newToken, { path: '/' });
      }

      if (isAuthRoute) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return res;
    } catch {

      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};