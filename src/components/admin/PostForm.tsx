"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { Post } from "@/types/firebase";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
});

interface PostFormProps {
  post?: Post;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [tags, setTags] = useState<string>(post?.tags?.join(", ") ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Armaan Yadav");
  const [readTime, setReadTime] = useState(post?.read_time ?? "5 min read");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState<
    "draft" | "publish" | "unpublish" | null
  >(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!isEdit) setSlug(slugify(v));
  };

  const uploadCover = async (file: File) => {
    setCoverUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    setCoverUploading(false);
    if (!res.ok) {
      setError("Cover upload failed");
      return;
    }
    const { url } = await res.json();
    setCoverImage(url);
  };

  const save = async (
    publishState: boolean,
    action: "draft" | "publish" | "unpublish",
  ) => {
    setError("");
    setSaving(action);

    const payload = {
      title,
      slug,
      description,
      content,
      cover_image: coverImage,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      author,
      read_time: readTime,
      published: publishState,
      published_at: publishState
        ? (post?.published_at ?? new Date().toISOString())
        : null,
    };

    const url = isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save post");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default submit saves as current publish state
    save(published, published ? "publish" : "draft");
  };

  const handleDelete = async () => {
    if (!post || !confirm(`Delete "${post.title}"? This cannot be undone.`))
      return;
    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Delete failed");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  };

  const label =
    "block text-xs font-medium text-black/60 dark:text-white/60 mb-1 uppercase tracking-wider";
  const input =
    "w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 border border-red-400 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Title + Slug row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Title *</label>
          <input
            className={input}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="My Awesome Post"
          />
        </div>
        <div>
          <label className={label}>Slug *</label>
          <input
            className={input}
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            required
            placeholder="my-awesome-post"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Description (SEO / card text)</label>
        <textarea
          className={`${input} resize-none`}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short summary of the post…"
        />
      </div>

      {/* Cover image */}
      <div>
        <label className={label}>Cover Image</label>
        <div className="flex gap-2 items-start">
          <input
            className={`${input} flex-1`}
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://… or upload below"
          />
          <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-black/20 dark:border-white/20 text-sm bg-white dark:bg-black hover:border-black dark:hover:border-white transition-colors whitespace-nowrap">
            {coverUploading ? "Uploading…" : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadCover(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        {coverImage && (
          <div className="mt-2">
            {coverError ? (
              <div className="h-24 flex items-center justify-center border border-dashed border-black/20 dark:border-white/20 text-xs text-black/40 dark:text-white/40">
                Image failed to load — check bucket is public in Firebase
                Storage
              </div>
            ) : (
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-32 w-full object-cover border border-black/10 dark:border-white/10"
                onError={() => setCoverError(true)}
                onLoad={() => setCoverError(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={label}>Author</label>
          <input
            className={input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Read Time</label>
          <input
            className={input}
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="5 min read"
          />
        </div>
        <div>
          <label className={label}>Tags (comma-separated)</label>
          <input
            className={input}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nginx, ssl, devops"
          />
        </div>
      </div>

      {/* TipTap editor */}
      <div>
        <label className={label}>Content *</label>
        <TipTapEditor content={content} onChange={setContent} />
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-xs text-red-500 hover:underline"
            >
              Delete post
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="px-4 py-2 text-sm border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving !== null}
            onClick={() => save(false, "draft")}
            className="px-4 py-2 text-sm border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors disabled:opacity-40"
          >
            {saving === "draft" ? "Saving…" : "Save Draft"}
          </button>
          {isEdit && published ? (
            <button
              type="button"
              disabled={saving !== null}
              onClick={() => save(false, "unpublish")}
              className="px-5 py-2 text-sm border border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 transition-colors font-medium"
            >
              {saving === "unpublish" ? "Saving…" : "Unpublish"}
            </button>
          ) : (
            <button
              type="button"
              disabled={saving !== null}
              onClick={() => save(true, "publish")}
              className="px-5 py-2 text-sm bg-black dark:bg-white text-white dark:text-black hover:opacity-80 disabled:opacity-40 transition-opacity font-medium"
            >
              {saving === "publish" ? "Publishing…" : "Publish Now"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
