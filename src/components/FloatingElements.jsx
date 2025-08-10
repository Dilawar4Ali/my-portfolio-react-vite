
// components/FloatingElements.js
import React from "react";

const FloatingElements = React.memo(({ scrollY }) => (
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

export default FloatingElements;
