import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { createClient } from "@supabase/supabase-js";
import type { Post } from "@/types/supabase";

const contentDirectory = path.join(process.cwd(), "src/app/content");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  author: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(".md", ""),
        title: data.title || "Untitled",
        description: data.description || "",
        publishedDate: data.publishedDate || "",
        author: data.author || "Unknown",
        readTime: data.readTime || "5 min read",
        tags: data.tags || [],
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
      defaultLang: "plaintext",
      onVisitLine(node: any) {
        // Prevent lines from collapsing in `display: grid` mode, and allow empty
        // lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className = node.properties.className || [];
        node.properties.className.push("highlighted");
      },
      onVisitHighlightedChars(node: any) {
        node.properties.className = ["word"];
      },
    })
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    publishedDate: data.publishedDate || "",
    author: data.author || "Unknown",
    readTime: data.readTime || "5 min read",
    tags: data.tags || [],
    content: processedContent.toString(),
  };
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  limit: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  // Score posts based on tag overlap
  const scoredPosts = allPosts.map((post) => {
    const commonTags = post.tags.filter((tag) => currentTags.includes(tag));
    return {
      post,
      score: commonTags.length,
    };
  });

  // Sort by score (most related first) and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

// ──────────────────────────────────────────────
// Supabase-backed post helpers (published only)
// ──────────────────────────────────────────────

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function supabasePostToMeta(post: Post): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedDate: post.published_at ?? post.created_at,
    author: post.author,
    readTime: post.read_time,
    tags: post.tags ?? [],
    coverImage: post.cover_image ?? undefined,
  };
}

export async function getSupabasePosts(): Promise<BlogPostMeta[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("posts") as any)
    .select("id, title, slug, description, cover_image, published_at, created_at, author, read_time, tags")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return (data as Post[]).map(supabasePostToMeta);
}

export async function getSupabasePostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("posts") as any)
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;

  const post = data as Post;
  return {
    ...supabasePostToMeta(post),
    content: post.content ?? "",
  };
}

export async function getAllPostsMerged(): Promise<BlogPostMeta[]> {
  const [supabasePosts, localPosts] = await Promise.all([
    getSupabasePosts(),
    Promise.resolve(getAllPosts()),
  ]);

  // Supabase slugs take precedence; filter out any local duplicates
  const supabaseSlugs = new Set(supabasePosts.map((p) => p.slug));
  const filteredLocal = localPosts.filter((p) => !supabaseSlugs.has(p.slug));

  return [...supabasePosts, ...filteredLocal].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
