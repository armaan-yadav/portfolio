import { getAllPosts } from "@/lib/blog";
import BlogPostItem from "@/components/BlogPostItem";
import Container from "@/components/Container";

export const metadata = {
  title: "Blog | Armaan Yadav",
  description: "Technical articles and tutorials on web development, DevOps, and cybersecurity.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="flex flex-col mt-3">
      {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6">Blog</h1> */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
        Technical articles and tutorials on topics I find interesting.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Check back soon!</p>
      ) : (
        <div>
          {posts.map((post, index) => (
            <BlogPostItem
              key={post.slug}
              post={{
                link: `/blog/${post.slug}`,
                title: post.title,
                description: post.description,
                tags: post.tags,
                publishedDate: post.publishedDate,
                readTime: post.readTime,
                author: post.author,
              }}
              index={index}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
