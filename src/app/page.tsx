import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Destinations from "@/components/landing/destinations";
import Features from "@/components/landing/features";
import Testimonials from "@/components/landing/testimonials";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Destinations />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}