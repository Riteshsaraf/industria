import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
 const token = request.cookies.get('token')?.value;

  console.log({token});

    const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  // Not logged in → redirect to login
  // if (!token && !isAuthPage) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // // Logged in → prevent access to login page
  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL('/home', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /* Match all request paths except for the ones starting with:
    api, _next/static, _next/image, favicon.ico, images, _next/public
    */
    '/((?!api|_next/static|_next/image|favicon.ico|images|_next/public).*)',
  ],
};
