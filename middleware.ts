import { createMiddleware, detectBot, shield } from "@arcjet/next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import aj from "./lib/arcjet";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

const validate = aj
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: ["GOOGLE_CRAWLER", "CATEGORY:SEARCH_ENGINE"],
    })
  );

export default createMiddleware(validate);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
};
