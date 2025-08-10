
// components/Projects.js
import React from "react";
import { Rocket, Github, ExternalLink } from "lucide-react";

const Projects = React.forwardRef(({ 
  isAnimated, 
  isMobile, 
  personalData 
}, ref) => (
  <section
    id="projects"
    ref={ref}
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
));

export default Projects;
