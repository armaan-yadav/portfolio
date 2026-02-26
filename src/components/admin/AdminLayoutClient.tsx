"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !isLoginPage) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    });
    return () => unsubscribe();
  }, [router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <header className="w-full border-b border-black/10 dark:border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="font-bold text-sm tracking-tight"
          >
            Admin
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            All Posts
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            View Site ↗
          </Link>
        </div>
        <button
          className="text-xs text-black/50 dark:text-white/50 hover:text-red-500 dark:hover:text-red-500 transition-colors cursor-pointer"
          onClick={() => {
            auth.signOut();
            router.replace("/admin/login");
          }}
        >
          Sign out
        </button>
      </header>
      <main className="flex-1 w-full p-6">{children}</main>
    </div>
  );
}
