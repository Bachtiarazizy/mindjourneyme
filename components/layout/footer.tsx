"use client";

import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="relative z-10 bg-primary/10 border-t-2 border-border mt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">mindjourneyme</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Jurnal perjalanan tumbuh dalam memahami diri, orang lain, dan kehidupan. Semoga setiap tulisan di sini bisa menjadi cermin atau pelukan kecil untukmu.</p>
          </div>

          {/* Let's Connect */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Let&apos;s Connect</h4>
            <p className="text-muted-foreground mb-4">Punya pertanyaan atau ingin berbagi cerita?</p>
            <p className="text-primary font-bold flex items-center gap-2 mb-4">
              <span>📧</span> azkamusfirah@gmail.com
            </p>
          </div>

          {/* Follow My Journey */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Follow My Journey</h4>
            <div className="flex gap-3 mb-6">
              <Link
                href="https://www.instagram.com/azkamsf_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center border-2 border-primary-border shadow-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/azka-musfirah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center border-2 border-primary-border shadow-primary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
            <button onClick={scrollToTop} className="text-primary hover:text-primary/80 font-bold transition-colors">
              ← Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                Tentang aku
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">Copyright © 2025 mindjourneyme. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
