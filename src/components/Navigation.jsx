// components/Navigation.js
import React from "react";
import { Menu, X } from "lucide-react";

const Navigation = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  activeSection,
  setActiveSection,
  scrollToSection, 
  isMobile 
}) => (
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
        {["home", "about", "projects", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item);
              setActiveSection(item);
            }}
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
                onClick={() => {
                  scrollToSection(item);
                  setActiveSection(item);
                }}
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

export default Navigation;