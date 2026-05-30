import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Destinations from "@/components/landing/destinations";
import Features from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Destinations />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
