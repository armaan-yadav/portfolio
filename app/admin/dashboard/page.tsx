import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { RiEditLine, RiAddLine } from "react-icons/ri";
import PublishToggle from "@/components/admin/PublishToggle";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: postsRaw, error } = await (supabase.from("posts") as any)
    .select("id, title, slug, published, published_at, tags, read_time, created_at")
    .order("created_at", { ascending: false });

  const posts = postsRaw as Array<{
    id: string;
    title: string;
    slug: string;
    published: boolean;
    published_at: string | null;
    tags: string[];
    read_time: string;
    created_at: string;
  }> | null;

  if (error) {
    return (
      <div className="p-4 border border-red-400 text-sm text-red-600 dark:text-red-400">
        Failed to load posts: {error.message}
      </div>
    );
  }

  const published = posts?.filter((p) => p.published) ?? [];
  const drafts = posts?.filter((p) => !p.published) ?? [];

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Posts</h1>
          <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">
            {posts?.length ?? 0} total · {published.length} published · {drafts.length} drafts
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black dark:border-white text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          <RiAddLine size={13} />
          New Post
        </Link>
      </div>

      {/* Post list */}
      {!posts || posts.length === 0 ? (
        <div className="py-20 text-center text-sm text-black/40 dark:text-white/40 border border-dashed border-black/20 dark:border-white/20">
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="underline underline-offset-2">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="border border-black/10 dark:border-white/10">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 text-xs text-black/40 dark:text-white/40 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <span>Title</span>
            <span className="hidden md:block">Tags</span>
            <span className="hidden sm:block">Date</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-4 py-3 text-sm ${
                i !== posts.length - 1 ? "border-b border-black/10 dark:border-white/10" : ""
              } hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors`}
            >
              {/* Title + slug */}
              <div className="min-w-0">
                <p className="font-medium truncate text-xs">{post.title}</p>
                <p className="text-xs text-black/40 dark:text-white/40 truncate">/blog/{post.slug}</p>
              </div>

              {/* Tags */}
              <div className="hidden md:flex gap-1">
                {post.tags?.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-xs border border-black/20 dark:border-white/20 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Date */}
              <span className="hidden sm:block text-xs text-black/40 dark:text-white/40 whitespace-nowrap">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                  : "—"}
              </span>

              {/* Status toggle */}
              <PublishToggle
                id={post.id}
                published={post.published}
                publishedAt={post.published_at}
              />

              {/* Actions */}
              <div className="flex items-center gap-2">
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                  >
                    View ↗
                  </Link>
                )}
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors"
                >
                  <RiEditLine size={11} />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
