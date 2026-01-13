import { client } from "@/sanity/client";
import AllArticles from "./all-articles";

// Query to get all posts with their categories
const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset,
    alt
  },
  category->{
    _id,
    title,
    slug
  },
  author->{
    name,
    image
  },
  publishedAt,
  readTime
}`;

// Query to get all categories with post counts
const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

export default async function AllArticlesServer() {
  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([client.fetch(ALL_POSTS_QUERY), client.fetch(CATEGORIES_QUERY)]);

  // Filter out categories with no posts (optional)
  const categoriesWithPosts = categories.filter((cat: any) => cat.postCount > 0);

  return <AllArticles posts={posts} categories={categoriesWithPosts} />;
}
