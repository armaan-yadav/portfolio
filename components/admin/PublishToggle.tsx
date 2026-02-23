"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

interface Props {
  id: string;
  published: boolean;
  publishedAt: string | null;
}

export default function PublishToggle({ id, published: initialPublished, publishedAt }: Props) {
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    const next = !published;
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        published: next,
        published_at: next ? (publishedAt ?? new Date().toISOString()) : null,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setPublished(next);
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      alert(d.error ?? "Failed to update");
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={published ? "Click to unpublish" : "Click to publish"}
      className={`flex items-center gap-1 text-xs px-2 py-1 border transition-colors disabled:opacity-40 ${
        published
          ? "border-green-400/50 text-green-600 dark:text-green-400 hover:border-red-400/50 hover:text-red-500 dark:hover:text-red-400"
          : "border-black/20 dark:border-white/20 text-black/40 dark:text-white/40 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
      }`}
    >
      {loading ? (
        <span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
      ) : published ? (
        <RiEyeLine size={12} />
      ) : (
        <RiEyeOffLine size={12} />
      )}
      {loading ? "…" : published ? "Live" : "Draft"}
    </button>
  );
}
