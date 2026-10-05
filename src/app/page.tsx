import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import RequestFlow from "@/components/RequestFlow";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navbar />
      <main id="top">
        <Hero />
        <Terminal />
        <About />
        <Services />
        <Skills />
        <RequestFlow />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
