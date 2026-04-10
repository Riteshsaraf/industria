import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get Cookies
  const userSession = request.cookies.get("User_Session")?.value;
  const adminSsoSession = request.cookies.get("AppServiceAuthSession")?.value; // TBD: Verify MS SSO Session name

  console.log(userSession);

  // ---- TBD: CHECK IF REQUIRED ----- //
  // console.log({ Cookie: request.cookies });
  // const token = request.cookies.get("token")?.value;
  // ------------------------------- //

  // Defining Guardrails based on the actual URL path
  // External User Pages
  const isUserPage =
    pathname.startsWith("/user");

  // Login Pages
  const isLoginPage = pathname === "/login" || pathname === "/";

 
  // Admin Pages
  const isAdminPage =
    pathname.startsWith("/home") 
    pathname.startsWith("/provinces") ||
    pathname.startsWith("/test-list") ||
    pathname.startsWith("/tests");

  // RULE 1: Protect External User Pages
  if (isUserPage && !userSession) {
    // If external users try to access a SRT page without userSession, send to login screen
    return NextResponse.redirect(new URL("/", request.url));
  }

  // RULE 2: Protect Admin Pages
  // if (isAdminPage && !adminSsoSession) {
  //   // If admins try to hit an admin page without MS SSO, send to MS Login screen
  //   // SSO should have its own redirect, for backup
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // RULE 3: Prevent Logged-in Users from seeing the Login page
  if (isLoginPage && userSession) {
    return NextResponse.redirect(
      new URL("/user", request.url), // TBD: set it to main SRT page
    );
  }

  // ---- TBD: CHECK IF REQUIRED ----- //
  // 🔒 Not logged in → block protected pages
  // if (!token && isAdminPage) {
  //   // return NextResponse.redirect(new URL("/login", request.url));
  // }
  // // 🔁 Logged in → block login page
  // if (token && isLoginPage) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  // ------------------------------- //

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
