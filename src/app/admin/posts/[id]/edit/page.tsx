import { adminDb } from "@/lib/firebase/admin";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import type { Post } from "@/types/firebase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  if (!adminDb) {
    throw new Error("Firebase admin database not initialized");
  }

  const doc = await adminDb.collection("posts").doc(id).get();

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
