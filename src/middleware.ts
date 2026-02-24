import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Public admin routes — never require auth
  const isPublicAdminRoute =
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/auth/");

  // Must be initialised before createServerClient so setAll can reassign it
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write refreshed tokens to the request (for downstream Server Components)
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          );
          // Recreate response so the new cookies are forwarded to the browser
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // DO NOT put any logic between createServerClient and getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated → redirect to login (copying session cookies so token
  // refresh isn't lost)
  if (!user && !isPublicAdminRoute) {
    const redirectResponse = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    supabaseResponse.cookies.getAll().forEach((cookie) =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    );
    return redirectResponse;
  }

  // Already authenticated → redirect away from login
  if (user && pathname === "/admin/login") {
    const redirectResponse = NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
    supabaseResponse.cookies.getAll().forEach((cookie) =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    );
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
