import React from 'react';

const Logo = () => (
  <svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
    {/* A subtle medical cross icon in the background */}
    <rect x="8" y="18" width="14" height="6" rx="2" fill="#e0f2fe" />
    <rect x="12" y="14" width="6" height="14" rx="2" fill="#e0f2fe" />
    
    {/* The main rounded text */}
    <text 
      x="30" 
      y="36" 
      fontFamily="'Nunito', 'Segoe UI', Tahoma, sans-serif" 
      fontSize="32" 
      fontWeight="900" 
      letterSpacing="-1"
    >
      <tspan fill="#007bff">fam</tspan>
      <tspan fill="#2c3e50">doc</tspan>
    </text>
    
    {/* A small "online" indicator dot */}
    <circle cx="145" cy="18" r="4" fill="#28a745" />
  </svg>
);

export default Logo;