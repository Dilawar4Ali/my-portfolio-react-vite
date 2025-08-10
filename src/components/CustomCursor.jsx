
// components/CustomCursor.js
import React from "react";

const CustomCursor = ({ mousePosition, isMobile }) => {
  if (isMobile) return null;

  return (
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
  );
};

export default CustomCursor;
