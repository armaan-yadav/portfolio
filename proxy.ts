import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — use getSession() in middleware to avoid a live
  // network round-trip to Supabase on every request (getUser() makes one,
  // which can fail/timeout at the edge and incorrectly return null).
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isAuthCallback = request.nextUrl.pathname === "/admin/auth/callback";

  // If accessing /admin (but not login/callback), user must be authenticated
  if (isAdminRoute && !isLoginPage && !isAuthCallback) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    // Optional: restrict to a single admin email
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (adminEmail && user.email?.toLowerCase() !== adminEmail) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in admin visits login page, redirect to dashboard
  if (isLoginPage && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
