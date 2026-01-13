import React from "react";
import HeroSection from "@/components/shared/hero";
import AboutSection from "@/components/shared/about";
import NewestArticlesServer from "@/components/shared/newest-articles-server";
import AllArticlesServer from "@/components/shared/all-articles-server";

export default function MindJourneyLanding() {
  return (
    <div className="min-h-screen bg-background relative">
      <HeroSection />
      <AboutSection />

      <NewestArticlesServer />
      <AllArticlesServer />
    </div>
  );
}
