import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";

import Navbar from "./components/NavBar";
import ParticleBackground from "./components/ParticleBackground";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const heroRef = useRef(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* Only show ParticleBackground when NOT on Hero */}
      {!isHeroInView && <ParticleBackground />}
      <div ref={heroRef}>
        <Hero />
      </div>
      <ShowcaseSection />
      <LogoShowcase />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
