
// components/Contact.js
import React from "react";
import { Mail, Github, Linkedin, Sparkles } from "lucide-react";

const Contact = React.forwardRef(({ 
  isAnimated, 
  isMobile, 
  personalData 
}, ref) => (
  <section
    id="contact"
    ref={ref}
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
));

export default Contact;
