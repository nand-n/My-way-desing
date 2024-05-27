import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import SustainabilityGoals from "@/components/Sdg/SustainabilityGoals";
import Workshops from "@/components/Team";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Way Design",
  description: "My Way Design is dedicated to creating beautiful, handcrafted crochet pieces that celebrate African heritage. Our mission is to empower women by teaching them valuable skills and helping them start their own businesses..",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <SustainabilityGoals />

      <CallToAction />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <Faq />
      <Workshops />
      {/* <HomeBlogSection posts={posts} /> */}
      <Contact />
      {/* <Clients /> */}
    </main>
  );
}
