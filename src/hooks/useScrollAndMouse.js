// hooks/useScrollAndMouse.js
import { useState, useEffect, useRef } from 'react';

export const useScrollAndMouse = (isMobile) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

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

  return { mousePosition, scrollY };
};