import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const sessionCookie = request.cookies.get("auth_session")?.value;

  const appPassword = process.env.APP_PASSWORD || "admin";
  const expectedHash = await crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(appPassword))
    .then((buf) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    );
  const isAuthenticated = sessionCookie === expectedHash;

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api/auth") ||
    url.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (!isAuthenticated && url.pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && url.pathname === "/login") {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
