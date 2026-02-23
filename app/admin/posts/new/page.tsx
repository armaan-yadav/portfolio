import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">New Post</h1>
      </div>
      <PostForm />
    </div>
  );
}
