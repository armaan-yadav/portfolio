import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const contentDirectory = path.join(process.cwd(), "app/content");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  author: string;
  readTime: string;
  tags: string[];
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
