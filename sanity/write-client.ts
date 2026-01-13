import { createClient } from '@sanity/client';

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // False untuk write operations
  token: process.env.SANITY_API_TOKEN, // Server-only token
});