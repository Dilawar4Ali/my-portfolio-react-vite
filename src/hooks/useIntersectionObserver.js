// hooks/useIntersectionObserver.js
import { useEffect } from 'react';

export const useIntersectionObserver = ({ refs, onActiveSection, onAnimation }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            onActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px"
      }
    );

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs, onActiveSection]);

  useEffect(() => {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.id;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            onAnimation(prev => ({
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

    refs.forEach(ref => {
      if (ref.current) {
        animationObserver.observe(ref.current);
      }
    });

    return () => animationObserver.disconnect();
  }, [refs, onAnimation]);
};
