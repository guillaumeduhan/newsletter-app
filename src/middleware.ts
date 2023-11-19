import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const publicUrls = ['/subscribe', '/unsubscribe']

  if (publicUrls.includes(req.nextUrl.pathname)) {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}