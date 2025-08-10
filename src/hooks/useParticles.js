
// hooks/useParticles.js
import { useState, useEffect, useRef } from 'react';

export const useParticles = () => {
  const [particles, setParticles] = useState([]);
  const particleAnimationRef = useRef(null);

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
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return particles;
};
