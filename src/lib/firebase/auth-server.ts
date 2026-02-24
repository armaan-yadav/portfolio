import { cookies } from "next/headers";
import { adminAuth } from "./admin";

export async function checkAdmin() {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) {
    return { error: true, reason: "No session cookie found." };
  }

  if (!adminAuth) {
    return { error: true, reason: "Firebase Admin not initialized." };
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (adminEmail && decodedClaims.email !== adminEmail) {
      return { error: true, reason: `Not an admin. Logged in as: ${decodedClaims.email}` };
    }
    
    return { error: false, user: decodedClaims };
  } catch (error) {
    return { error: true, reason: "Invalid or expired session cookie." };
  }
}
