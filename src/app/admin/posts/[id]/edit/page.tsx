import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import type { Post } from "@/types/supabase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: postRaw, error } = await (supabase.from("posts") as any)
    .select("*")
    .eq("id", id)
    .single();

  const post = postRaw as Post | null;

  if (error || !post) notFound();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
      </div>
      <PostForm post={post} />
    </div>
  );
}
