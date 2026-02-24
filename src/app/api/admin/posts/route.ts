import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import type { Post, PostInsert } from "@/types/supabase";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: true, reason: "No user found in Supabase session. Make sure you are logged in and cookies are sent." };
  
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) {
    return { error: true, reason: `Not an admin. Logged in as: ${user.email}. Expected: ${adminEmail}` };
  }
  
  return { error: false, user };
}

// GET /api/admin/posts – list all posts
export async function GET() {
  const auth = await assertAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  const db = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db.from("posts") as any).select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Post[]);
}

// POST /api/admin/posts – create post
export async function POST(request: NextRequest) {
  const auth = await assertAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  const body = await request.json();

  const insert: PostInsert = {
    title: body.title,
    slug: body.slug,
    description: body.description ?? "",
    content: body.content ?? "",
    cover_image: body.cover_image ?? "",
    tags: body.tags ?? [],
    author: body.author ?? "Armaan Yadav",
    read_time: body.read_time ?? "5 min read",
    published: body.published ?? false,
    published_at: body.published_at ?? null,
  };

  const db = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db.from("posts") as any)
    .insert(insert)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Post, { status: 201 });
}
