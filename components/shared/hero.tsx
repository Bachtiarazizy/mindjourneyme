import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.jpg" alt="Hero Background" fill className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50"></div>
      </div>

      {/* Floating Ghibli-style elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse z-10" />
      <div className="absolute bottom-32 right-40 w-24 h-24 bg-secondary/10 rounded-full blur-3xl animate-pulse z-10" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-primary-foreground">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl  leading-relaxed">Selamat datang di</p>
              <h1 className="font-serif text-4xl md:text-5xl uppercase lg:text-6xl font-bold text-primary-foreground leading-tight">mindjourneyme</h1>
              <p className="text-xl md:text-2xl  leading-relaxed">Jurnal Perjalanan Tumbuhku</p>
            </div>
            <Link href="/blog">
              <Button variant="secondary">Baca tulisan terbaru</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
