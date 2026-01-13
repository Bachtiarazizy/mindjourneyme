"use client";

import React, { useState, useMemo } from "react";
import { User, Calendar } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: {
    asset: any;
    alt?: string;
  };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  author: {
    name: string;
    image?: any;
  };
  publishedAt: string;
  readTime: number;
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  postCount: number;
}

interface AllArticlesProps {
  posts: Post[];
  categories: Category[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export default function AllArticles({ posts, categories }: AllArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category._id === selectedCategory);
  }, [posts, selectedCategory]);

  // Calculate total post count
  const totalPostCount = posts.length;

  return (
    <section className="relative z-10 container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Semua Artikel ({filteredPosts.length})</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-md sticky top-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">▼</span> Kategori
              </h3>
              <ul className="space-y-2">
                {/* All Categories Option */}
                <li
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center justify-between cursor-pointer transition-colors py-2 border-b border-border/50 ${selectedCategory === null ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"}`}
                >
                  <span>Semua Kategori</span>
                  <span className="text-sm">{totalPostCount}</span>
                </li>

                {/* Individual Categories */}
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`flex items-center justify-between cursor-pointer transition-colors py-2 border-b border-border/50 ${selectedCategory === category._id ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <span>{category.title}</span>
                    <span className="text-sm">{category.postCount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-2">
            {filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post._id} className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:translate-y-1 group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold z-10 border-2 border-primary-border">{post.category.title}</span>
                      {post.mainImage?.asset ? (
                        <Image src={urlForImage(post.mainImage.asset)?.url() || ""} alt={post.mainImage.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <a href={`/blog/${post.slug.current}`} className="block flex-1">
                        <h3 className="font-serif text-lg font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      </a>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm pt-2 border-border border-t">
                        <div className="flex items-center gap-2">
                          {post.author.image ? (
                            <div className="w-6 h-6 rounded-full overflow-hidden relative border-2 border-primary/20">
                              <Image src={urlForImage(post.author.image)?.url() || ""} alt={post.author.name} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                          )}
                          <span className="text-xs font-bold text-foreground">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card border-2 border-border rounded-xl">
                <p className="text-muted-foreground text-lg">Tidak ada artikel dalam kategori ini. 📝</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
