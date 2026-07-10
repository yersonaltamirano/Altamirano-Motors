import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedCars />
      <Footer />
    </main>
  );
}