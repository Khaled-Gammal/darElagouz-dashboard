import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  let cookie = request.cookies.get("token");
  console.log(cookie);
  const notTokenRoutes = [
    "/login",
  ];
  const isTrue =
    !pathname.endsWith("/") &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/);

  if (
    !cookie?.value &&
    !notTokenRoutes.includes(request.nextUrl.pathname) &&
    isTrue
  ) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }
}