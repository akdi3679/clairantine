import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Public client (uses CDN for speed)
export const sanityPublic: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Crucial for L2 performance: fast, cached reads
  perspective: "published",
});

// Preview client (bypasses CDN for draft content)
export const sanityPreview: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Required for preview
  perspective: "previewDrafts",
});

// Image URL builder (Ref §77)
const builder = imageUrlBuilder(sanityPublic);
export function urlFor(source: any) {
  return builder.image(source).auto("format").fit("max");
}