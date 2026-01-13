"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cek apakah di homepage atau bukan
  const isHomepage = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo - ganti berdasarkan halaman */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={isHomepage ? "/logo.png" : "/logo-primary.png"} alt="Logo" width={200} height={200} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`font-bold transition-colors ${isHomepage ? "text-primary-foreground hover:text-primary" : "text-primary hover:text-primary/80"}`}>
            Beranda
          </Link>
          <Link href="/blog" className={`font-bold transition-colors ${isHomepage ? "text-primary-foreground hover:text-primary" : "text-primary hover:text-primary/80"}`}>
            Blog
          </Link>
          <Link href="/about" className={`font-bold transition-colors ${isHomepage ? "text-primary-foreground hover:text-primary" : "text-primary hover:text-primary/80"}`}>
            Tentang aku
          </Link>
          <Button>Contact</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 rounded-lg border-2 border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center shadow-sm"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
        <div className="bg-card border-2 border-border rounded-xl shadow-lg p-6 space-y-4">
          <Link href="/" className="block text-foreground hover:text-primary transition-colors font-bold py-2 px-4 rounded-lg hover:bg-primary/10">
            Beranda
          </Link>
          <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors font-bold py-2 px-4 rounded-lg hover:bg-primary/10">
            Blog
          </Link>
          <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors font-bold py-2 px-4 rounded-lg hover:bg-primary/10">
            Tentang aku
          </Link>
          <Button>Contact</Button>
        </div>
      </div>
    </nav>
  );
}
