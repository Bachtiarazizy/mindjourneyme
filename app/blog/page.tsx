import NewestArticlesServer from "@/components/shared/newest-articles-server";
import AllArticlesServer from "@/components/shared/all-articles-server";
import { Sparkles, BookOpen } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Texture overlay */}
      <div className="texture" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Ghibli elements */}
        <div className="absolute top-32 right-32 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse z-10" />
        <div className="absolute bottom-32 left-32 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse z-10" style={{ animationDelay: "1.5s" }} />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border-2 border-primary/20 mb-6 animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">Blog</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Perjalanan <span className="text-primary">Tumbuh</span> Bersamaku
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Sebagai manusia yang juga sering tersandung dalam perjalanan hidup, sudut kecil ini kutulis untuk berbagi cerita, refleksi, dan pemikiran tentang proses bertumbuh - dengan segala ketidaksempurnaannya. Mari bertumbuh bersama.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a
                href="#articles"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold border-2 border-primary-border shadow-primary transition-all hover:translate-y-[-2px]"
              >
                <BookOpen className="w-5 h-5" />
                Mulai Membaca
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration (Ghibli style) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64 C320,96 420,32 600,64 C780,96 880,32 1200,64 L1200,120 L0,120 Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* Content sections */}
      <div className="relative z-10">
        {/* Newest Articles Carousel */}
        <div id="articles" className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <NewestArticlesServer />
        </div>

        {/* Decorative separator - Ghibli style */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="flex gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <Sparkles className="w-4 h-4 text-primary/70 animate-pulse" style={{ animationDelay: "0.3s" }} />
                <Sparkles className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: "0.6s" }} />
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>

        {/* All Articles with Filter */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <AllArticlesServer />
        </div>

        {/* Inspirational Quote Section - Ghibli style */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-12 text-center backdrop-blur-sm">
              <div className="mb-6">
                <Sparkles className="w-12 h-12 text-primary mx-auto" />
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic mb-6 leading-relaxed">&quot;Setiap perjalanan dimulai dengan satu langkah kecil. Yang penting adalah terus melangkah.&quot;</blockquote>
              <p className="text-muted-foreground">- Terinspirasi dari My Neighbor Totoro</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom decorative wave */}
      <div className="relative z-10 w-full h-24 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C320,32 420,96 600,64 C780,32 880,96 1200,64 L1200,0 L0,0 Z" fill="var(--card)" opacity="0.5" />
        </svg>
      </div>
    </main>
  );
}
