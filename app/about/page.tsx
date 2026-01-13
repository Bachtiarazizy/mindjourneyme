import React from "react";
import { Sparkles, MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Texture overlay */}
      <div className="texture" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border-2 border-primary/20 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">About Me</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Azka Musfirah</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">Mahasiswa Psikologi Konseling | Pengamat Manusia Paruh Waktu, Ahli Overthinking 24/7 | Manusia biasa yang sering kebelet curhat lewat tulisan.</p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              {/* Photo */}
              <div className="relative ">
                <div className="relative aspect-4/5 max-w-md mx-auto">
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3 border-2 border-primary/30" />
                  <div className="relative bg-card border-2 border-border rounded-3xl overflow-hidden shadow-xl">
                    <Image src="/azka.png" alt="Azka Musfirah" width={300} height={300} className="w-full h-full object-cover" />
                  </div>

                  {/* Info Cards */}
                  <div className="absolute -bottom-6 -right-6 bg-card border-2 border-border rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-sm text-foreground">Based in</p>
                        <p className="text-xs text-muted-foreground">Türkiye</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -left-6 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold border-2 border-primary-border shadow-lg -rotate-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      <span>Psychology Student</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 ">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Hai, aku Azka! 👋</h2>

                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Sebagai mahasiswa psikologi konseling yang sedang menempuh studi di Turki, aku menemukan keindahan dalam mengamati cerita-cerita tak terucap di balik setiap interaksi manusia. Blog ini kubuat sebagai ruang berbagi
                    refleksi personal tentang perjalanan tumbuh sebagai manusia, kajian psikologi sederhana yang relevan dengan keseharian, serta pengalamanku sebagai mahasiswa Indonesia di negeri orang.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Dengan latar belakang akademis dan ketertarikanku pada dinamika manusia, aku percaya setiap orang membawa narasi unik yang layak untuk didengarkan - termasuk cerita-cerita yang tersembunyi di balik senyuman, diam, atau
                    bahkan keputusan-keputusan kecil.
                  </p>
                  <p className="text-lg italic text-muted-foreground leading-relaxed">&quot;Karena terkadang, yang kita butuhkan hanyalah seseorang yang mau benar-benar mendengar.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card border-2 border-border rounded-2xl p-12 text-center shadow-lg">
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic mb-6 leading-relaxed">&quot;Growth is messy. but so is baklava-and we all love that&quot;</blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
