export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image: string;
  tags: string[];
  author: string;
  read_time: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;
