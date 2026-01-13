import React from "react";
import { Sparkles } from "lucide-react";
import { MaskedImage } from "../ui/masked-image";

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main photo frame */}
                <MaskedImage src="/azka.png" alt="Description" width={500} height={500} variant="shape1" /> {/* Floating badge */}
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border-2 border-primary/20 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">Tentang Aku</span>
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Halo, aku Azka! 👋</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mahasiswa bimbingan dan psikologi konseling yang gemar mengamati hidup dan menuliskannya. Blog ini adalah jurnal perjalananku memahami diri, orang lain, dan kehidupan. Semoga setiap tulisanku di sini bisa menjadi cermin
                  atau pelukan kecil untukmu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
