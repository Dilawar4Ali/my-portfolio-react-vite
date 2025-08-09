import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Menu,
  X,
  Code,
  Rocket,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  
  // Separate animation states for each section
  const [sectionAnimations, setSectionAnimations] = useState({
    home: true, // Home starts animated
    about: false,
    projects: false,
    contact: false
  });
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Refs for animation tracking
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const particleAnimationRef = useRef(null);

  // Initialize particles only once
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < (window.innerWidth < 768 ? 15 : 30); i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Separate particle animation loop
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX) > window.innerWidth ? 0 : 
           (particle.x + particle.speedX) < 0 ? window.innerWidth : 
           particle.x + particle.speedX,
        y: (particle.y + particle.speedY) > window.innerHeight ? 0 : 
           (particle.y + particle.speedY) < 0 ? window.innerHeight : 
           particle.y + particle.speedY
      })));
    };

    particleAnimationRef.current = setInterval(animateParticles, 50);
    return () => {
      if (particleAnimationRef.current) {
        clearInterval(particleAnimationRef.current);
      }
    };
  }, []);

  // Check mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
  }, []);

  // Separate intersection observer for section visibility (active nav)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px"
      }
    );

    const sections = [heroRef, aboutRef, projectsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Separate intersection observer for animations (trigger once)
  useEffect(() => {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.id;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setSectionAnimations(prev => ({
              ...prev,
              [sectionId]: true
            }));
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    const sections = [heroRef, aboutRef, projectsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) {
        animationObserver.observe(ref.current);
      }
    });

    return () => animationObserver.disconnect();
  }, []);

  // Mouse and scroll tracking - optimized to avoid frequent re-renders
  useEffect(() => {
    let mouseAnimationFrame = null;
    let scrollAnimationFrame = null;

    const handleMouseMove = (e) => {
      if (!isMobile && !mouseAnimationFrame) {
        mouseAnimationFrame = requestAnimationFrame(() => {
          mousePositionRef.current = { x: e.clientX, y: e.clientY };
          setMousePosition({ x: e.clientX, y: e.clientY });
          mouseAnimationFrame = null;
        });
      }
    };

    const handleScroll = () => {
      if (!scrollAnimationFrame) {
        scrollAnimationFrame = requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY;
          setScrollY(window.scrollY);
          scrollAnimationFrame = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (mouseAnimationFrame) cancelAnimationFrame(mouseAnimationFrame);
      if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
    };
  }, [isMobile]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const personalData = {
    name: "Dilawar Ali Thaheem",
    title: "Mobile App Developer & AI Specialist",
    email: "dilawarthaheem@yahoo.com",
    bio: "Computer Science graduate with specialization in Artificial Intelligence and hands-on experience in mobile and web development. Proficient in building cross-platform mobile applications using React Native, with backend integration through Django and cloud services. Successfully led development of real-world projects like CropSight, incorporating geospatial mapping, push notifications, and machine learning-based analytics.",
    skills: [
      "React Native",
      "JavaScript",
      "TypeScript",
      "Python",
      "Django",
      "FastAPI",
      "Firebase",
      "Machine Learning",
      "React",
      "Node.js",
      "MongoDB",
      "SQL",
      "Git",
      "Google Cloud Platform",
      "Mapbox",
      "Computer Vision",
    ],
    projects: [
      {
        id: 1,
        title: "CropSight",
        description:
          "A comprehensive farm management solution utilizing satellite imagery and remote sensing data to optimize crop monitoring, yield prediction, and resource management with machine learning integration.",
        technologies: [
          "React Native",
          "Django",
          "React",
          "Next.js",
          "Firebase",
          "Google Earth Engine",
          "Sentinel Hub",
          "FCM",
        ],
        githubUrl: "#",
        liveUrl: "https://smartaisolutions.net",
        status: "In Progress",
      },
      {
        id: 2,
        title: "Brain Tumor Detection",
        description:
          "AI-powered brain tumor detection system using CT images with Convolutional Neural Networks (CNNs) and Support Vector Machine (SVM) for early diagnosis assistance.",
        technologies: [
          "Python",
          "CNN",
          "SVM",
          "OpenCV",
          "NumPy",
          "Tkinter",
          "HOG",
        ],
        githubUrl: "#",
        liveUrl: "#",
        status: "Completed",
      },
      {
        id: 3,
        title: "Stationary Management System",
        description:
          "Comprehensive Database Management System for inventory management, sales tracking, and stock level monitoring with analytical reporting features.",
        technologies: [
          "JavaFX",
          "SQL Server",
          "Database Management",
          "Stored Procedures",
        ],
        githubUrl: "#",
        liveUrl: "#",
        status: "Completed",
      },
    ],
    social: {
      github: "#",
      linkedin: "https://www.linkedin.com/in/dilawar-ali-thaheem-368707212",
      twitter: "#",
    },
  };

  // Memoized components to prevent unnecessary re-renders
  const ParticleField = React.memo(() => (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      zIndex: 1 
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: '#60a5fa',
            borderRadius: '50%',
            opacity: particle.opacity,
            filter: 'blur(1px)',
            transition: 'all 0.1s linear',
          }}
        />
      ))}
    </div>
  ));

  const FloatingElements = React.memo(() => (
    <>
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
        borderRadius: '50%',
        filter: 'blur(20px)',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1,
        transform: `translateY(${scrollY * 0.05}px)`,
      }} />
      <div style={{
        position: 'fixed',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        borderRadius: '50%',
        filter: 'blur(25px)',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1,
        transform: `translateY(${scrollY * -0.03}px)`,
      }} />
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '80%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
        borderRadius: '50%',
        filter: 'blur(15px)',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 1,
        transform: `translateY(${scrollY * 0.04}px)`,
      }} />
    </>
  ));

  const Navigation = () => (
    <nav
      style={{
        position: "fixed",
        top: isMobile ? "16px" : "24px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: isMobile ? "16px" : "50px",
        padding: isMobile ? "14px 24px" : "16px 32px",
        zIndex: 50,
        width: isMobile ? "calc(100vw - 32px)" : "auto",
        maxWidth: isMobile ? "400px" : "none",
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        animation: 'slideDown 0.8s ease-out',
      }}
    >
      {!isMobile && (
        <div style={{ display: "flex", gap: "32px", alignItems: 'center' }}>
          {["home", "about", "projects", "contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                background: activeSection === item ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "none",
                border: "none",
                color: activeSection === item ? "white" : "rgba(255, 255, 255, 0.8)",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                padding: activeSection === item ? "8px 16px" : "8px 12px",
                borderRadius: "25px",
                transform: activeSection === item ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item) {
                  e.target.style.color = "white";
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item) {
                  e.target.style.color = "rgba(255, 255, 255, 0.8)";
                  e.target.style.transform = "scale(1)";
                }
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      )}

      {isMobile && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "white", fontWeight: "600" }}>Menu</span>
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                transition: "transform 0.2s ease",
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onTouchStart={(e) => e.target.style.transform = "scale(0.9)"}
              onTouchEnd={(e) => e.target.style.transform = "scale(1)"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div style={{
            maxHeight: isMenuOpen ? "300px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease-out",
          }}>
            <div style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              {["home", "about", "projects", "contact"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 0",
                    color: activeSection === item ? "#60a5fa" : "rgba(255, 255, 255, 0.8)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: activeSection === item ? "600" : "400",
                    borderBottom: item !== "contact" ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                    transition: "all 0.2s ease",
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMenuOpen ? 1 : 0,
                    transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s',
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );

  const Hero = () => {
    const isAnimated = sectionAnimations.home;
    
    return (
      <section
        id="home"
        ref={heroRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 60%, #581c87 100%)",
          padding: isMobile ? "100px 16px 60px" : "80px 20px 60px",
        }}
      >
        {/* Animated Background Shapes */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "pulse 4s ease-in-out infinite",
            transform: `translateY(${scrollY * 0.1}px)`,
          }} />
          <div style={{
            position: "absolute",
            bottom: "20%",
            right: "20%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "pulse 4s ease-in-out infinite 2s",
            transform: `translateY(${scrollY * -0.05}px)`,
          }} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(30px)",
            animation: "pulse 6s ease-in-out infinite 1s",
            transform: `translateY(${scrollY * 0.08}px)`,
          }} />
        </div>

        <div style={{
          textAlign: "center",
          zIndex: 10,
          width: "100%",
          maxWidth: "1000px",
          padding: "0 40px",
        }}>
          <div style={{ 
            marginBottom: isMobile ? "32px" : "48px",
            position: "relative",
          }}>
            <div 
              className={isAnimated ? "hero-badge" : "hero-badge-hidden"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "50px",
                padding: "8px 16px",
                marginBottom: "24px",
              }}
            >
              <Sparkles size={16} style={{ color: "#60a5fa" }} />
              <span style={{ color: "#60a5fa", fontSize: "14px", fontWeight: "500" }}>
                Available for new opportunities
              </span>
            </div>

            <h1 
              className={isAnimated ? "hero-title" : "hero-title-hidden"}
              style={{
                fontSize: isMobile ? "2.8rem" : "clamp(3rem, 8vw, 5rem)",
                fontWeight: "800",
                background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 30%, #a855f7 60%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "16px",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              {personalData.name}
            </h1>
            
            <p 
              className={isAnimated ? "hero-subtitle" : "hero-subtitle-hidden"}
              style={{
                fontSize: isMobile ? "1.2rem" : "clamp(1.2rem, 3vw, 1.4rem)",
                color: "#cbd5e1",
                marginBottom: isMobile ? "32px" : "40px",
                fontWeight: "300",
                letterSpacing: "0.01em",
              }}
            >
              {personalData.title}
            </p>
          </div>

          <div 
            className={isAnimated ? "hero-buttons" : "hero-buttons-hidden"}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: isMobile ? "40px" : "64px",
            }}
          >
            <button
              onClick={() => scrollToSection("about")}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "white",
                padding: isMobile ? "16px 32px" : "14px 28px",
                borderRadius: "50px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: isMobile ? "16px" : "15px",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.02)";
                e.target.style.boxShadow = "0 20px 40px -10px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 25px -5px rgba(59, 130, 246, 0.3)";
              }}
            >
              <Rocket size={18} />
              Explore My Work
              <ChevronDown size={16} />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
                padding: isMobile ? "16px 32px" : "14px 28px",
                borderRadius: "50px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: isMobile ? "16px" : "15px",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Let's Talk
              <ArrowRight size={16} />
            </button>
          </div>

          <div 
            className={isAnimated ? "hero-social" : "hero-social-hidden"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: isMobile ? "24px" : "20px",
            }}
          >
            {[
              { icon: Github, href: personalData.social.github },
              { icon: Linkedin, href: personalData.social.linkedin },
              { icon: Twitter, href: personalData.social.twitter },
            ].map(({ icon: SocialIcon, href }, index) => (
              <a
                key={index}
                href={href}
                style={{
                  color: "#94a3b8",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "12px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-4px) scale(1.1)";
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#94a3b8";
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <SocialIcon size={isMobile ? 20 : 18} />
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const About = () => {
    const isAnimated = sectionAnimations.about;

    return (
      <section
        id="about"
        ref={aboutRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "80px 16px" : "100px 20px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          padding: "0 40px",
        }}>
          <div style={{
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "60px" : "80px",
            alignItems: "center",
          }}>
            <div 
              className={isAnimated ? "about-image" : "about-image-hidden"}
              style={{
                display: "flex",
                justifyContent: "center",
                order: isMobile ? 2 : 1,
              }}
            >
              <div style={{
                position: "relative",
                width: "clamp(220px, 35vw, 320px)",
                height: "clamp(220px, 35vw, 320px)",
                borderRadius: "20px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
                padding: "4px",
                animation: isAnimated ? "float 6s ease-in-out infinite" : "none",
              }}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                  <img
                    src="/images/dilawart.JPG"
                    alt="About Me"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
              </div>
            </div>

            <div 
              className={isAnimated ? "about-content" : "about-content-hidden"}
              style={{
                order: isMobile ? 1 : 2,
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "50px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}>
                <Code size={16} style={{ color: "#60a5fa" }} />
                <span style={{ color: "#60a5fa", fontSize: "14px", fontWeight: "500" }}>
                  About Me
                </span>
              </div>

              <h2 style={{
                fontSize: isMobile ? "2.2rem" : "clamp(2.2rem, 5vw, 2.8rem)",
                fontWeight: "800",
                color: "white",
                marginBottom: "24px",
                textAlign: isMobile ? "center" : "left",
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
              }}>
                Crafting Digital{" "}
                <span style={{
                  background: "linear-gradient(135deg, #60a5fa, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Experiences
                </span>
              </h2>

              <p style={{
                color: "#cbd5e1",
                fontSize: isMobile ? "16px" : "clamp(16px, 2.5vw, 18px)",
                lineHeight: "1.7",
                marginBottom: "40px",
                textAlign: isMobile ? "center" : "left",
              }}>
                {personalData.bio}
              </p>

              <div style={{ marginBottom: "40px" }}>
                <h3 style={{
                  fontSize: isMobile ? "18px" : "20px",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "20px",
                  textAlign: isMobile ? "center" : "left",
                }}>
                  Technologies I Love
                </h3>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}>
                  {personalData.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className={isAnimated ? `skill-tag skill-tag-${index}` : "skill-tag-hidden"}
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "10px 16px",
                        borderRadius: "25px",
                        fontSize: "14px",
                        color: "white",
                        whiteSpace: "nowrap",
                        fontWeight: "500",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(59, 130, 246, 0.2)";
                        e.target.style.borderColor = "rgba(59, 130, 246, 0.4)";
                        e.target.style.transform = "translateY(-2px) scale(1.02)";
                        e.target.style.color = "#60a5fa";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255, 255, 255, 0.08)";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                        e.target.style.transform = "translateY(0) scale(1)";
                        e.target.style.color = "white";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: isMobile ? "center" : "left" }}>
                <button
                  className={isAnimated ? "about-button" : "about-button-hidden"}
                  onClick={() => scrollToSection("projects")}
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    padding: "14px 28px",
                    borderRadius: "50px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px) scale(1.02)";
                    e.target.style.boxShadow = "0 20px 40px -10px rgba(59, 130, 246, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = "0 10px 25px -5px rgba(59, 130, 246, 0.3)";
                  }}
                >
                  View My Projects
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Projects = () => {
    const isAnimated = sectionAnimations.projects;

    return (
      <section
        id="projects"
        ref={projectsRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "80px 16px" : "100px 20px",
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "0 40px",
        }}>
          <div 
            className={isAnimated ? "projects-header" : "projects-header-hidden"}
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "60px" : "80px",
            }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "50px",
              padding: "8px 16px",
              marginBottom: "24px",
            }}>
              <Rocket size={16} style={{ color: "#a855f7" }} />
              <span style={{ color: "#a855f7", fontSize: "14px", fontWeight: "500" }}>
                My Work
              </span>
            </div>

            <h2 style={{
              fontSize: isMobile ? "2.2rem" : "clamp(2.2rem, 5vw, 2.8rem)",
              fontWeight: "800",
              color: "white",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}>
              Featured{" "}
              <span style={{
                background: "linear-gradient(135deg, #60a5fa, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Projects
              </span>
            </h2>
            <p style={{
              color: "#94a3b8",
              fontSize: isMobile ? "16px" : "18px",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              Showcasing innovative solutions that blend cutting-edge technology with real-world impact
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(380px, 1fr))",
            gap: isMobile ? "32px" : "40px",
          }}>
            {personalData.projects.map((project, index) => (
              <div
                key={project.id}
                className={isAnimated ? `project-card project-card-${index}` : "project-card-hidden"}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: isMobile ? "28px" : "32px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}>
                  <h3 style={{
                    fontSize: isMobile ? "20px" : "22px",
                    fontWeight: "700",
                    color: "white",
                    margin: 0,
                    flex: 1,
                    minWidth: 0,
                    letterSpacing: "-0.01em",
                  }}>
                    {project.title}
                  </h3>
                  <span style={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    borderRadius: "20px",
                    backgroundColor: project.status === "Completed" 
                      ? "rgba(34, 197, 94, 0.15)" 
                      : "rgba(234, 179, 8, 0.15)",
                    color: project.status === "Completed" ? "#4ade80" : "#facc15",
                    border: `1px solid ${project.status === "Completed" ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    fontWeight: "600",
                  }}>
                    {project.status}
                  </span>
                </div>

                <p style={{
                  color: "#cbd5e1",
                  fontSize: isMobile ? "15px" : "16px",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "28px",
                }}>
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={isAnimated ? `tech-tag tech-tag-${index}-${techIndex}` : "tech-tag-hidden"}
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.15)",
                        color: "#93c5fd",
                        padding: "6px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        fontWeight: "500",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(59, 130, 246, 0.3)";
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "rgba(59, 130, 246, 0.15)";
                        e.target.style.color = "#93c5fd";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <a
                    href={project.githubUrl}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#94a3b8",
                      fontSize: "15px",
                      textDecoration: "none",
                      gap: "6px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      padding: "8px 0",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "white";
                      e.target.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    <Github size={18} />
                    View Code
                  </a>
                  <a
                    href={project.liveUrl}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#94a3b8",
                      fontSize: "15px",
                      textDecoration: "none",
                      gap: "6px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      padding: "8px 0",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#60a5fa";
                      e.target.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Contact = () => {
    const isAnimated = sectionAnimations.contact;

    return (
      <section
        id="contact"
        ref={contactRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "80px 16px" : "100px 20px",
          backgroundColor: "rgba(15, 23, 42, 0.98)",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite",
        }} />

        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
          padding: "0 40px",
          position: "relative",
          zIndex: 2,
        }}>
          <div 
            className={isAnimated ? "contact-header" : "contact-header-hidden"}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              border: "1px solid rgba(236, 72, 153, 0.2)",
              borderRadius: "50px",
              padding: "8px 16px",
              marginBottom: "24px",
            }}>
              <Sparkles size={16} style={{ color: "#ec4899" }} />
              <span style={{ color: "#ec4899", fontSize: "14px", fontWeight: "500" }}>
                Get In Touch
              </span>
            </div>

            <h2 style={{
              fontSize: isMobile ? "2.2rem" : "clamp(2.2rem, 5vw, 2.8rem)",
              fontWeight: "800",
              color: "white",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}>
              Let's{" "}
              <span style={{
                background: "linear-gradient(135deg, #60a5fa, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Create Something
              </span>{" "}
              Amazing
            </h2>

            <p style={{
              color: "#cbd5e1",
              fontSize: isMobile ? "16px" : "clamp(16px, 2.5vw, 18px)",
              marginBottom: "64px",
              lineHeight: "1.7",
              maxWidth: "600px",
              margin: "0 auto 64px",
            }}>
              I'm always excited about new opportunities and innovative projects. 
              Let's discuss how we can bring your ideas to life!
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "24px" : "32px",
            marginBottom: "60px",
          }}>
            {[
              {
                icon: Mail,
                title: "Email Me",
                subtitle: personalData.email,
                href: `mailto:${personalData.email}`,
                gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                subtitle: "Connect with me",
                href: personalData.social.linkedin,
                gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              },
              {
                icon: Github,
                title: "GitHub",
                subtitle: "View my code",
                href: personalData.social.github,
                gradient: "linear-gradient(135deg, #ec4899, #db2777)",
              },
            ].map(({ icon: ContactIcon, title, subtitle, href, gradient }, index) => (
              <a
                key={index}
                href={href}
                className={isAnimated ? `contact-card contact-card-${index}` : "contact-card-hidden"}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: isMobile ? "32px 24px" : "40px 32px",
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  display: "block",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.08)";
                  e.target.style.transform = "translateY(-8px) scale(1.02)";
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.3)";
                  e.target.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.03)";
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  transition: "transform 0.3s ease",
                }}>
                  <ContactIcon size={24} style={{ color: "white" }} />
                </div>
                <h3 style={{
                  color: "white",
                  fontWeight: "700",
                  marginBottom: "8px",
                  fontSize: isMobile ? "18px" : "20px",
                  letterSpacing: "-0.01em",
                }}>
                  {title}
                </h3>
                <p style={{
                  color: "#94a3b8",
                  fontSize: isMobile ? "14px" : "15px",
                  wordBreak: "break-word",
                  fontWeight: "400",
                }}>
                  {subtitle}
                </p>
              </a>
            ))}
          </div>

          <div 
            className={isAnimated ? "contact-footer" : "contact-footer-hidden"}
            style={{
              textAlign: "center",
            }}
          >
            <p style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "20px",
            }}>
              © 2025 {personalData.name}. Crafted with passion and precision.
            </p>
            <div style={{
              width: "60px",
              height: "2px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
              margin: "0 auto",
              borderRadius: "2px",
            }} />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      color: "white",
      overflowX: "hidden",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      width: "100%",
      minHeight: "100vh",
      position: "relative",
    }}>
      {/* Particle Field */}
      <ParticleField />
      
      {/* Floating Elements */}
      <FloatingElements />

      {/* Custom Cursor - Desktop Only */}
      {!isMobile && (
        <>
          <div style={{
            position: "fixed",
            width: "40px",
            height: "40px",
            border: "2px solid rgba(96, 165, 250, 0.3)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "all 0.1s ease-out",
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            mixBlendMode: "difference",
          }} />
          <div style={{
            position: "fixed",
            width: "8px",
            height: "8px",
            backgroundColor: "#60a5fa",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "all 0.05s ease-out",
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
          }} />
        </>
      )}

      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />

      <style jsx>{`
        /* Hero Animations */
        .hero-badge {
          animation: slideInFromTop 0.8s ease-out 0.2s both;
        }
        .hero-badge-hidden {
          opacity: 0;
          transform: translateY(-30px);
        }

        .hero-title {
          animation: slideInFromLeft 1s ease-out 0.4s both;
        }
        .hero-title-hidden {
          opacity: 0;
          transform: translateX(-50px);
        }

        .hero-subtitle {
          animation: slideInFromRight 1s ease-out 0.6s both;
        }
        .hero-subtitle-hidden {
          opacity: 0;
          transform: translateX(50px);
        }

        .hero-buttons {
          animation: fadeInUp 1s ease-out 0.8s both;
        }
        .hero-buttons-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .hero-social {
          animation: fadeInUp 1s ease-out 1s both;
        }
        .hero-social-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        /* About Animations */
        .about-image {
          animation: slideInFromLeft 0.8s ease-out 0.2s both;
        }
        .about-image-hidden {
          opacity: 0;
          transform: translateX(-50px);
        }

        .about-content {
          animation: slideInFromRight 0.8s ease-out 0.4s both;
        }
        .about-content-hidden {
          opacity: 0;
          transform: translateX(50px);
        }

        .skill-tag {
          animation: fadeInUp 0.6s ease-out both;
        }
        .skill-tag-hidden {
          opacity: 0;
          transform: translateY(20px);
        }

        .about-button {
          animation: fadeInUp 1s ease-out 1s both;
        }
        .about-button-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        /* Projects Animations */
        .projects-header {
          animation: fadeInUp 0.8s ease-out both;
        }
        .projects-header-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .project-card {
          animation: fadeInUp 0.8s ease-out both;
        }
        .project-card-hidden {
          opacity: 0;
          transform: translateY(50px);
        }

        .tech-tag {
          animation: fadeInScale 0.4s ease-out both;
        }
        .tech-tag-hidden {
          opacity: 0;
          transform: translateY(10px) scale(0.8);
        }

        /* Contact Animations */
        .contact-header {
          animation: fadeInUp 0.8s ease-out both;
        }
        .contact-header-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .contact-card {
          animation: fadeInUp 0.8s ease-out both;
        }
        .contact-card-hidden {
          opacity: 0;
          transform: translateY(50px);
        }

        .contact-footer {
          animation: fadeInUp 1s ease-out 1.4s both;
        }
        .contact-footer-hidden {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Staggered delays for multiple items */
        .skill-tag-0 { animation-delay: 0.6s; }
        .skill-tag-1 { animation-delay: 0.65s; }
        .skill-tag-2 { animation-delay: 0.7s; }
        .skill-tag-3 { animation-delay: 0.75s; }
        .skill-tag-4 { animation-delay: 0.8s; }
        .skill-tag-5 { animation-delay: 0.85s; }
        .skill-tag-6 { animation-delay: 0.9s; }
        .skill-tag-7 { animation-delay: 0.95s; }
        .skill-tag-8 { animation-delay: 1s; }
        .skill-tag-9 { animation-delay: 1.05s; }
        .skill-tag-10 { animation-delay: 1.1s; }
        .skill-tag-11 { animation-delay: 1.15s; }
        .skill-tag-12 { animation-delay: 1.2s; }
        .skill-tag-13 { animation-delay: 1.25s; }
        .skill-tag-14 { animation-delay: 1.3s; }
        .skill-tag-15 { animation-delay: 1.35s; }

        .project-card-0 { animation-delay: 0.2s; }
        .project-card-1 { animation-delay: 0.4s; }
        .project-card-2 { animation-delay: 0.6s; }

        .tech-tag-0-0 { animation-delay: 0.8s; }
        .tech-tag-0-1 { animation-delay: 0.85s; }
        .tech-tag-0-2 { animation-delay: 0.9s; }
        .tech-tag-0-3 { animation-delay: 0.95s; }
        .tech-tag-0-4 { animation-delay: 1s; }
        .tech-tag-0-5 { animation-delay: 1.05s; }
        .tech-tag-0-6 { animation-delay: 1.1s; }
        .tech-tag-0-7 { animation-delay: 1.15s; }

        .tech-tag-1-0 { animation-delay: 1s; }
        .tech-tag-1-1 { animation-delay: 1.05s; }
        .tech-tag-1-2 { animation-delay: 1.1s; }
        .tech-tag-1-3 { animation-delay: 1.15s; }
        .tech-tag-1-4 { animation-delay: 1.2s; }
        .tech-tag-1-5 { animation-delay: 1.25s; }
        .tech-tag-1-6 { animation-delay: 1.3s; }

        .tech-tag-2-0 { animation-delay: 1.2s; }
        .tech-tag-2-1 { animation-delay: 1.25s; }
        .tech-tag-2-2 { animation-delay: 1.3s; }
        .tech-tag-2-3 { animation-delay: 1.35s; }

        .contact-card-0 { animation-delay: 0.8s; }
        .contact-card-1 { animation-delay: 1s; }
        .contact-card-2 { animation-delay: 1.2s; }

        /* Base Keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        /* Selection styling */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }

        /* Focus states */
        button:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
        }

        a:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;