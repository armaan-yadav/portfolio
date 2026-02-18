import {
  getPostBySlug,
  getAllSlugs,
  getRelatedPosts,
  getRelativeTime,
} from "@/lib/blog";
import { notFound } from "next/navigation";
import { RiCalendarLine, RiTimeLine, RiUser3Line } from "react-icons/ri";
import BlogEndSection from "@/components/BlogPostEnd";
import RelatedPosts from "@/components/RelatedPosts";
import CodeBlockCopyButton from "@/components/CodeBlockCopyButton";
import Container from "@/components/Container";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Armaan Yadav`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags, 3);
  const relativeTime = getRelativeTime(post.publishedDate);

  return (
    <Container className="flex flex-col mt-3">
      <CodeBlockCopyButton />
      <article>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs border border-gray-500 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <RiUser3Line className="mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <RiCalendarLine className="mr-1" />
              <span title={post.publishedDate}>{relativeTime}</span>
            </div>
            <div className="flex items-center">
              <RiTimeLine className="mr-1" />
              {post.readTime}
            </div>
          </div>
        </header>

        <div
          className="prose prose-sm sm:prose dark:prose-invert max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <BlogEndSection />

        <RelatedPosts posts={relatedPosts} />
      </article>
    </Container>
  );
}
