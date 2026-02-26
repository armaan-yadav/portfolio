import { db } from "@/lib/firebase-admin";
import type { Post, PostInsert } from "@/types/firebase";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/posts – list all posts
export async function GET(request: NextRequest) {
  if (!db) return NextResponse.json({ error: "Firebase DB not initialized" }, { status: 500 });

  // Auth check
  const idToken = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  try {
    const { getAuth } = await import("firebase-admin/auth");
    const { initializeApp, applicationDefault, getApps } = await import("firebase-admin/app");
    const app = getApps().length ? getApps()[0] : initializeApp({ credential: applicationDefault() });
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(idToken);
    if (!decodedToken.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Proceed with fetching posts
    const snapshot = await db.collection("posts").orderBy("created_at", "desc").get();
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
  if (!db) return NextResponse.json({ error: "Firebase Admin DB not initialized" }, { status: 500 });

  // Auth check
  const idToken = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  try {
    const { getAuth } = await import("firebase-admin/auth");
    const { initializeApp, applicationDefault, getApps } = await import("firebase-admin/app");
    const app = getApps().length ? getApps()[0] : initializeApp({ credential: applicationDefault() });
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(idToken);
    if (!decodedToken.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Proceed with creating post
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
    const docRef = await db.collection("posts").add({
      ...insert,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
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
