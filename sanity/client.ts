import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";

interface SanityImageAsset {
  _ref: string;
  _type: string;
}

interface SanityImage {
  asset: SanityImageAsset;
  hotspot?: unknown;
  crop?: unknown;
}

interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface Contact {
  email?: string;
  socialMedia?: SocialMedia;
}

interface HeroSection {
  headline?: string;
  subheadline?: string;
  heroImage?: SanityImage;
}

interface PremiumSection {
  headline?: string;
  description?: string;
  image?: SanityImage;
}

export interface SiteSettings {
  title?: string;
  description?: string;
  logo?: SanityImage;
  heroSection?: HeroSection;
  premiumSection?: PremiumSection;
  contact?: Contact;
}

// Fallback values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Keep false during development
  perspective: "published",
  stega: false,
});

const builder = createImageUrlBuilder(client);

export function urlForImage(source: unknown) {
  if (!source) return null;

  try {
    return builder.image(source);
  } catch (error) {
    console.error("Error building image URL:", error);
    return null;
  }
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Don't use CDN for writes
});

// Test connection function
export async function testConnection() {
  try {
    const result = await client.fetch(`*[_type == "siteSettings"]`);
    console.log("✅ Connection successful:", result);
    return result;
  } catch (error) {
    console.error("❌ Connection failed:", error);
    throw error;
  }
}