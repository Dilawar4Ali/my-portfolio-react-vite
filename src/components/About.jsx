
// components/About.js
import React from "react";
import { Code, ArrowRight } from "lucide-react";
import dilawartImg from "../assets/dilawart.JPG";

const About = React.forwardRef(({ 
  isAnimated, 
  scrollToSection, 
  isMobile, 
  personalData 
}, ref) => (
  <section
    id="about"
    ref={ref}
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
                src={dilawartImg} 
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
));

export default About;