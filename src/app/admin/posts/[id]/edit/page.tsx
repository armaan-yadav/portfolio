import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import type { Post } from "@/types/firebase";
import { db } from "@/lib/firebase-admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  if (!db) {
    throw new Error("Firebase admin database not initialized");
  }

  const doc = await db.collection("posts").doc(id).get();

  if (!doc.exists) {
    notFound();
  }

  const post = { id: doc.id, ...doc.data() } as Post;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
      </div>
      <PostForm post={post} />
    </div>
  );
}
