import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mindjourneyme - Jurnal Perjalanan Tumbuhku",
  description: "Mindjourneyme adalah jurnal perjalanan tumbuh—ruang refleksi, kesadaran diri, dan pencarian makna hidup melalui tulisan, pengalaman, dan proses menjadi versi diri yang lebih utuh.",
  verification: {
    google: "-qqEwyG_hrR5c49eowpEXzz3y0Co5SREC1lFfCozYN8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${ptSans.variable} bg-background antialiased relative`}>
        <div className="texture" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
