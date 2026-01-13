import { client } from "@/sanity/client";
import NewestArticles from "./newest-articles";

const NEWEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset,
    alt
  },
  category->{
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

export default async function NewestArticlesServer() {
  const posts = await client.fetch(NEWEST_POSTS_QUERY);
  
  return <NewestArticles posts={posts} />;
}