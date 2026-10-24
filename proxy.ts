import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Core Security Headers (Ref §10)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  
  // Permissions Policy (Disable unused browser features)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // 2. HSTS (Strict-Transport-Security) - Enforced in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  // 3. Content Security Policy (CSP) - Ref §10
  // Note: Framer Motion and Next.js require specific allowances. 
  // We use a baseline that prevents XSS while allowing our stack.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://cdn.sanity.io`,
    "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline in dev, strict in prod via nonce
    "img-src 'self' data: https://cdn.sanity.io https://images.unsplash.com blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://cdn.sanity.io https://api.sanity.io wss://cdn.sanity.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  
  // Pass nonce to the app if needed (optional for now)
  request.headers.set("x-nonce", nonce);

  // 4. Fetch Metadata Validation (Defense against CSRF/Clickjacking - Ref §10)
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  const fetchMode = request.headers.get("Sec-Fetch-Mode");
  
  // Block cross-origin POST/PUT/DELETE requests (basic CSRF protection)
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    if (fetchSite === "cross-site" && fetchMode !== "navigate") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};