import { adminDb } from "@/lib/firebase/admin";
import { checkAdmin } from "@/lib/firebase/auth-server";
import { NextRequest, NextResponse } from "next/server";
import type { Post } from "@/types/firebase";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH /api/admin/posts/[id]
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  if (!adminDb) return NextResponse.json({ error: "Firebase DB not initialized" }, { status: 500 });
  
  try {
    const docRef = adminDb.collection("posts").doc(id);
    await docRef.update({ ...body, updated_at: new Date().toISOString() });
    
    const docSnapshot = await docRef.get();
    const updatedPost = { id: docSnapshot.id, ...docSnapshot.data() } as Post;
    
    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.reason }, { status: 401 });

  const { id } = await params;

  if (!adminDb) return NextResponse.json({ error: "Firebase DB not initialized" }, { status: 500 });
  
  try {
    await adminDb.collection("posts").doc(id).delete();
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
