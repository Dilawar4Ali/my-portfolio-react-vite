// components/Portfolio.js
import React, { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import ParticleField from "./ParticleField";
import FloatingElements from "./FloatingElements";
import CustomCursor from "./CustomCursor";
import { personalData } from "../data/personalData";
import { useScrollAndMouse } from "../hooks/useScrollAndMouse";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useParticles } from "../hooks/useParticles";
import "../styles/animations.css";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [sectionAnimations, setSectionAnimations] = useState({
    home: true,
    about: false,
    projects: false,
    contact: false,
  });

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const { mousePosition, scrollY } = useScrollAndMouse(isMobile);
  const particles = useParticles();

  // Check mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Setup intersection observers
  useIntersectionObserver({
    refs: [heroRef, aboutRef, projectsRef, contactRef],
    onActiveSection: setActiveSection,
    onAnimation: setSectionAnimations,
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        overflowX: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ParticleField particles={particles} />
      <FloatingElements scrollY={scrollY} />
      <CustomCursor mousePosition={mousePosition} isMobile={isMobile} />

      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
        isMobile={isMobile}
      />

      <Hero
        ref={heroRef}
        isAnimated={sectionAnimations.home}
        scrollToSection={scrollToSection}
        scrollY={scrollY}
        isMobile={isMobile}
        personalData={personalData}
      />

      <About
        ref={aboutRef}
        isAnimated={sectionAnimations.about}
        scrollToSection={scrollToSection}
        isMobile={isMobile}
        personalData={personalData}
      />

      <Projects
        ref={projectsRef}
        isAnimated={sectionAnimations.projects}
        isMobile={isMobile}
        personalData={personalData}
      />

      <Contact
        ref={contactRef}
        isAnimated={sectionAnimations.contact}
        isMobile={isMobile}
        personalData={personalData}
      />
    </div>
  );
};

export default Portfolio;
