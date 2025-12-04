import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  const isAuthRoute = url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up");
  const isPrivateRoute = url.pathname.startsWith("/profile") || url.pathname.startsWith("/notes");

  if (!token && isPrivateRoute) {

    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (token && isAuthRoute) {

    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};