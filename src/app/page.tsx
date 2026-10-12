import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      {/* Scroll target for the logo and "Back to top" links. Kept off the sticky
          header, because a sticky element is always "in view" so the browser won't scroll to it. */}
      <span id="top" aria-hidden="true" className="absolute left-0 top-0" />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
