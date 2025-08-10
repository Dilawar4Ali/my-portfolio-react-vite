import React from "react";

const ParticleField = React.memo(({ particles }) => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    pointerEvents: 'none', 
    zIndex: 1 
  }}>
    {particles.map(particle => (
      <div
        key={particle.id}
        style={{
          position: 'absolute',
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          backgroundColor: '#60a5fa',
          borderRadius: '50%',
          opacity: particle.opacity,
          filter: 'blur(1px)',
          transition: 'all 0.1s linear',
        }}
      />
    ))}
  </div>
));

export default ParticleField;
