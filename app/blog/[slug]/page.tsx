/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, type SanityDocument } from "next-sanity";
import { client, urlForImage } from "@/sanity/client";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag, User, Heart, BookOpen, Share2 } from "lucide-react";
import CommentsSection from "@/components/shared/comment-section";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,  
  title,
  excerpt,
  slug,
  mainImage,
  body,
  category->{
    title,
    slug,
    color,
    icon
  },
  author->{
    name,
    slug,
    image,
    shortBio,
    jobTitle,
    social,
    featured
  },
  publishedAt,
  readTime,
  featured,
  premium,
  tags,
  "related": *[_type == "post" && references(^._id) && slug.current != $slug][0...3] {
    title,
    slug,
    mainImage,
    category->{
      title,
      slug
    },
    publishedAt
  }
}`;

const CATEGORIES_QUERY = `*[_type == "category"] | order(featured desc, title asc) {
  title,
  slug,
  color,
  icon,
  featured,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

  if (!post) {
    return {
      title: "Post Not Found | MindJourney",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | MindJourney`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlForImage(post.mainImage)?.url() || ""] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Anonymous"],
    },
    keywords: post.category?.title ? [post.category.title] : [],
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post, categories] = await Promise.all([client.fetch<SanityDocument>(POST_QUERY, { slug }, options), client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options)]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="texture" />
        <div className="relative z-10 text-center bg-card border-2 border-border rounded-2xl p-12 shadow-lg max-w-md mx-4">
          <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Post Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-bold border-2 border-primary-border shadow-primary transition-all hover:translate-y-[-2px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>
        </div>
      </div>
    );
  }

  const postImageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : null;
  const authorImageUrl = post.author?.image ? urlForImage(post.author.image)?.url() : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Texture overlay */}
      <div className="texture" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Blog
            </Link>

            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold border-2 border-primary-border shadow-primary">
                  <Tag className="w-4 h-4" />
                  {post.category.title}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-2">
                  {authorImageUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <span className="font-bold text-foreground">{post.author.name}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold">{formatDate(post.publishedAt)}</span>
              </div>

              {/* Read Time */}
              {post.readTime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">{post.readTime} menit baca</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {postImageUrl && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                <Image src={postImageUrl} alt={post.title} fill className="object-cover" priority />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Article Content */}
              <div className="lg:col-span-3">
                <article className="bg-card border-2 border-border rounded-2xl p-8 md:p-12 shadow-md">
                  <div className="prose max-w-none">{Array.isArray(post.body) && <PortableText value={post.body} />}</div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t-2 border-border">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, index: number) => (
                          <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-bold border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Section */}
                  <div className="mt-8 pt-8 border-t-2 border-border">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-foreground">Bagikan artikel ini:</p>
                      <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg font-bold border-2 border-border transition-all hover:translate-y-[-2px]">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </article>

                <CommentsSection postId={post._id} postSlug={post.slug.current} />

                {/* Author Bio */}
                {post.author && (
                  <div className="mt-8 bg-card border-2 border-border rounded-2xl p-8 shadow-md">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-primary" />
                      Tentang Penulis
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6">
                      {authorImageUrl ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md flex-shrink-0">
                          <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-12 h-12 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-foreground mb-1">{post.author.name}</h4>
                        {post.author.jobTitle && <p className="text-primary font-bold mb-3">{post.author.jobTitle}</p>}
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {post.author.shortBio || `${post.author.name} adalah kontributor di MindJourney yang berbagi pengalaman dan pengetahuan tentang ${post.category?.title || "berbagai topik"}.`}
                        </p>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors">
                          Lihat semua artikel →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Categories */}
                  <div className="bg-card border-2 border-border rounded-xl p-6 shadow-md">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Kategori
                    </h3>
                    <div className="space-y-2">
                      {categories.slice(0, 6).map((category: any) => (
                        <Link key={category.slug.current} href={`/blog?category=${category.slug.current}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 transition-colors group">
                          <span className="font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">{category.title}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{category.postCount}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-primary text-primary-foreground border-2 border-primary-border rounded-xl p-6 shadow-primary">
                    <Heart className="w-8 h-8 mb-4" />
                    <h3 className="font-bold text-lg mb-3">Suka artikel ini?</h3>
                    <p className="text-sm mb-4 opacity-90">Jelajahi lebih banyak artikel menarik lainnya!</p>
                    <Link href="/blog" className="block w-full bg-primary-foreground text-primary text-center px-4 py-2 rounded-lg font-bold hover:bg-background transition-all border-2 border-primary-border">
                      Lihat Semua Artikel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
