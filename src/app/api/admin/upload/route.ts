import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

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
    // Proceed with file upload
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });
    }
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `blog-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
