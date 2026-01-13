"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, User, Calendar } from "lucide-react";
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

interface NewestArticlesProps {
  posts: Post[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export default function NewestArticles({ posts }: NewestArticlesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, posts.length - itemsPerView);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Auto scroll carousel
  useEffect(() => {
    if (!carouselRef.current) return;

    // Calculate card width percentage based on itemsPerView
    const cardWidth = 100 / itemsPerView;
    // Move by one card at a time
    const scrollAmount = currentIndex * cardWidth;
    carouselRef.current.style.transform = `translateX(-${scrollAmount}%)`;
  }, [currentIndex, itemsPerView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <section className="relative z-10 container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Tulisan terbaru untuk kamu</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div ref={carouselRef} className="flex transition-transform duration-500 ease-out">
            {posts.map((post) => (
              <article key={post._id} className="shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
                <div className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:translate-y-1 group h-full flex flex-col">
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
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? "bg-primary w-8" : "bg-border hover:bg-primary/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Belum ada artikel yang dipublikasikan. 📝</p>
          </div>
        )}
      </div>
    </section>
  );
}
