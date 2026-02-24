import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Middleware already protects admin routes — just check user here for
  // rendering (navbar vs plain wrapper for login page).
  // Use getSession() instead of getUser() because getSession() reads from
  // cookies without making a network call, so it works even when Server
  // Components can't write refreshed cookies back.
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <div className="min-h-screen bg-white dark:bg-black">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <header className="w-full border-b border-black/10 dark:border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="font-bold text-sm tracking-tight">
            Admin
          </Link>
          <span className="text-black/20 dark:text-white/20 text-xs">|</span>
          <Link href="/admin/posts/new" className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">
            + New Post
          </Link>
          <Link href="/admin/dashboard" className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">
            All Posts
          </Link>
          <Link href="/" target="_blank" className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">
            View Site ↗
          </Link>
        </div>
        <div className="flex items-center gap-4 text-xs text-black/50 dark:text-white/50">
          <span>{session.user.email}</span>
          <Link href="/admin/auth/signout" className="hover:text-red-500 transition-colors">
            Sign out
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full p-6">
        {children}
      </main>
    </div>
  );
}


