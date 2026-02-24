import { adminDb } from "@/lib/firebase/admin";
import { checkAdmin } from "@/lib/firebase/auth-server";
import { NextRequest, NextResponse } from "next/server";
import type { Post, PostInsert } from "@/types/firebase";

// GET /api/admin/posts – list all posts
export async function GET() {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  if (!adminDb) return NextResponse.json({ error: "Firebase Admin DB not initialized" }, { status: 500 });

  try {
    const snapshot = await adminDb.collection("posts").orderBy("created_at", "desc").get();
    
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/posts – create post
export async function POST(request: NextRequest) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  if (!adminDb) return NextResponse.json({ error: "Firebase Admin DB not initialized" }, { status: 500 });

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

  try {
    // Add document with auto-generated ID
    const docRef = await adminDb.collection("posts").add({
      ...insert,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    // Fetch newly created document to return
    const docSnapshot = await docRef.get();
    const newPost = {
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as Post;
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
