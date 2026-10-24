import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  // Optional: Check for a secret token to prevent unauthorized revalidations
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret && secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Get the path to revalidate (defaults to home page)
  const path = request.nextUrl.searchParams.get("path") || "/";
  
  // Trigger Next.js On-Demand Revalidation
  revalidatePath(path);

  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now(), 
    path 
  });
}