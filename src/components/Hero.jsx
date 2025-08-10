
// components/Hero.js
import React from "react";
import { ChevronDown, Github, Linkedin, Twitter, Rocket, Sparkles, ArrowRight } from "lucide-react";

const Hero = React.forwardRef(({ 
  isAnimated, 
  scrollToSection, 
  scrollY, 
  isMobile, 
  personalData 
}, ref) => (
  <section
    id="home"
    ref={ref}
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
));

export default Hero;
